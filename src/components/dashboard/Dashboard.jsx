import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/Authcontext';

import BookCard from '../books/BookCard';
import toast from 'react-hot-toast';
import { deleteFromCloudinary } from '../utils/cloudinary';
import ChatList from '../chats/ChatList';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('listings');
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'books'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const books = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserBooks(books);
      } catch (error) {
        console.error('Error fetching user books:', error);
        if (error.message.includes('requires an index')) {
          toast.error('Book listings are being initialized. Please wait a moment...', {
            duration: 5000,
            id: 'books-index-error'
          });
        } else {
          toast.error('Failed to load your listings');
        }
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'listings') {
      fetchUserBooks();
      const interval = setInterval(fetchUserBooks, 5000);
      return () => clearInterval(interval);
    }
  }, [user, activeTab]);

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }
    
    try {
      // Find the book to get image public IDs
      const book = userBooks.find(b => b.id === bookId);
      
      // Delete the book document from Firestore first
      await deleteDoc(doc(db, 'books', bookId));
      
      // Try to delete images from Cloudinary, but don't block the book deletion
      if (book.imagePublicIds && book.imagePublicIds.length > 0) {
        try {
          const deletePromises = book.imagePublicIds.map(publicId => 
            deleteFromCloudinary(publicId)
          );
          await Promise.all(deletePromises);
        } catch (cloudinaryError) {
          console.error('Error deleting images from Cloudinary:', cloudinaryError);
          // Don't throw the error, just log it
        }
      }
      
      // Update local state
      setUserBooks(prev => prev.filter(book => book.id !== bookId));
      toast.success('Book listing deleted successfully');
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book listing');
    }
  };

  const renderContent = () => {
    if (activeTab === 'listings') {
      if (loading) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        );
      }

      return (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Listed Books</h2>
            <Link
              to="/sell"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              List New Book
            </Link>
          </div>

          {userBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBooks.map(book => (
                <div key={book.id} className="relative">
                  <BookCard book={book} />
                  <div className="absolute top-2 right-2 space-x-2">
                    <Link
                      to={`/edit/${book.id}`}
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">You haven't listed any books yet.</p>
              <Link
                to="/sell"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                List Your First Book
              </Link>
            </div>
          )}
        </div>
      );
    }

    return <ChatList/>;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'listings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Your Listings
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Messages
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard; 