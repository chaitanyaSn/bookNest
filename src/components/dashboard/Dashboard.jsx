import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/Authcontext';

import BookCard from '../books/BookCard';
import toast from 'react-hot-toast';
import { deleteFromCloudinary } from '../utils/cloudinary';

function Dashboard() {
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

    fetchUserBooks();
    const interval = setInterval(fetchUserBooks, 5000);
    return () => clearInterval(interval);
  }, [user]);

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Listed Books</h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : userBooks.length > 0 ? (
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
                className="inline-flex items-center text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 px-4 py-2 rounded-md"
              >
                List Your Book
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 