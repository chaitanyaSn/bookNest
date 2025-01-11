import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import BookCard from './BookCard';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    year: '',
    branch: ''
  });

  useEffect(() => {
    fetchBooks();
  }, [filters, user]);

  const fetchBooks = async () => {
    try {
      let constraints = [];
      
      // Exclude current user's books if logged in
      if (user) {
        constraints.push(where('userId', '!=', user.uid));
      }

      // Add year filter if selected
      if (filters.year) {
        constraints.push(where('year', '==', filters.year));
      }

      // Add branch filter if selected
      if (filters.branch) {
        constraints.push(where('branch', '==', filters.branch));
      }

      // Create query with all constraints
      const booksQuery = constraints.length > 0 
        ? query(collection(db, 'books'), ...constraints)
        : collection(db, 'books');

      const querySnapshot = await getDocs(booksQuery);
      const booksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="rounded-md border-gray-300"
          >
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>

          <select
            name="branch"
            value={filters.branch}
            onChange={handleFilterChange}
            className="rounded-md border-gray-300"
          >
            <option value="">Select Branch</option>
            <option value="cs">Computer Science</option>
            <option value="it">Information Technology</option>
            <option value="mechanical">Mechanical</option>
            <option value="chemical">Chemical</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map(book => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No books found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default BookList; 