import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, orderBy, addDoc, getDocs, onSnapshot, doc, setDoc, updateDoc, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import MessageList from './MessageList';
import toast from 'react-hot-toast';

function ChatBox() {
  const { userId: sellerId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sellerInfo, setSellerInfo] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch seller's information
    const fetchSellerInfo = async () => {
      try {
        const booksRef = collection(db, 'books');
        const q = query(booksRef, where('userId', '==', sellerId), limit(1));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const bookData = snapshot.docs[0].data();
          setSellerInfo({
            bookTitle: bookData.name,
            userId: sellerId
          });
        }
      } catch (error) {
        console.error('Error fetching seller info:', error);
      }
    };

    fetchSellerInfo();

    // Create a unique chat room ID by combining buyer and seller IDs
    const chatRoomId = [user.uid, sellerId].sort().join('_');

    // Subscribe to messages in real-time
    const messagesRef = collection(db, 'chats', chatRoomId, 'messages');
    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesList);
      setLoading(false);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [user, sellerId, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const chatRoomId = [user.uid, sellerId].sort().join('_');
      // Create or update the chat document
      const chatRef = doc(db, 'chats', chatRoomId);
      await setDoc(chatRef, {
        participants: [user.uid, sellerId],
        participantInfo: {
          [user.uid]: {
            name: user.displayName || 'Anonymous',
            email: user.email,
            photoURL: user.photoURL
          },
          [sellerId]: {
            bookTitle: sellerInfo?.bookTitle || 'Book Discussion'
          }
        },
        lastMessageTime: new Date().toISOString(),
        lastMessage: newMessage,
        createdAt: new Date().toISOString()
      }, { merge: true });

      const messagesRef = collection(db, 'chats', chatRoomId, 'messages');
      
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: user.uid,
        receiverId: sellerId,
        timestamp: new Date().toISOString(),
      });

      // Update the chat document with the last message time and text
      await updateDoc(chatRef, {
        lastMessageTime: new Date().toISOString(),
        lastMessage: newMessage
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow">
      <div className="h-[600px] flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={messages} currentUserId={user.uid} />
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatBox; 