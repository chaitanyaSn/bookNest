import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';

function BookCard({ book }) {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-3 aspect-h-2">
        <img
          src={book.imageUrls[0]}
          alt={book.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{book.name}</h3>
        
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-500">Year: {book.year}</p>
          <p className="text-sm text-gray-500">Branch: {book.branch}</p>
          <p className="text-sm text-gray-500">Condition: {book.condition}</p>
          <p className="text-lg font-bold text-blue-600">₹{book.price}</p>
        </div>

        {user && user.uid !== book.userId && (
          <Link
            to={`/chat/${book.userId}`}
            className="mt-4 block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Contact Seller
          </Link>
        )}
      </div>
    </div>
  );
}

export default BookCard; 