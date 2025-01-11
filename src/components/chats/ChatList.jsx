import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

function ChatList() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      if (!user) return;

      try {
        // Check if the index exists by attempting the query
        const q1 = query(
          collection(db, 'chats'),
          where('participants', 'array-contains', user.uid),
          orderBy('lastMessageTime', 'desc')
        );

        const chatSnapshot = await getDocs(q1);
        const chats = chatSnapshot.docs.map(doc => {
          const chatData = doc.data();
          const otherUserId = chatData.participants.find(id => id !== user.uid);
          const participantInfo = chatData.participantInfo || {};
          const otherUserInfo = participantInfo[otherUserId] || {};
          const currentUserInfo = participantInfo[user.uid] || {};

          return {
            id: doc.id,
            otherUserId,
            otherUserName: otherUserInfo.name || 'Unknown User',
            lastMessage: chatData.lastMessage || 'No messages yet',
            timestamp: chatData.lastMessageTime || chatData.createdAt,
            bookTitle: otherUserInfo.bookTitle || currentUserInfo.bookTitle || 'Book discussion'
          };
        });

        setChats(chats);
      } catch (error) {
        console.error('Error fetching chats:', error);
        if (error.message.includes('requires an index')) {
          toast.error('Chat system is being initialized. Please wait a moment...', {
            duration: 5000,
            id: 'chat-index-error' // Prevent duplicate toasts
          });
        } else {
          toast.error('Failed to load conversations');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
    // Poll for chats every 5 seconds while index is building
    const interval = setInterval(fetchChats, 5000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Conversations</h2>
      {chats.length > 0 ? (
        <div className="space-y-2">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/chat/${chat.otherUserId}`}
              className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">{chat.bookTitle}</p>
                  <p className="text-sm text-gray-600">
                    with {chat.otherUserName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(chat.timestamp).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No conversations yet.</p>
      )}
    </div>
  );
}

export default ChatList; 