import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-200">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-blue-600">BookNest</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your campus marketplace for textbooks. Exchange knowledge, save money, and connect with fellow students in your college community.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            {user ? (
              <div className="space-x-4">
                <Link
                  to="/books"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Browse Books
                </Link>
                <Link
                  to="/sell"
                  className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 hover:bg-purple-50 transition-colors duration-200"
                >
                  Sell a Book
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 bg-blue-100 rounded-md p-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Choose BookNest?</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

            <div className="text-center p-6 rounded-xl hover:shadow-lg hover:bg-blue-50 transition-shadow duration-200">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Easy Listing</h3>
              <p className="mt-2 text-base text-gray-600">
                List your books in minutes with our simple interface. Add photos, set your price, and reach potential buyers instantly.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg  hover:bg-blue-50 transition-shadow duration-200">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Direct Chat</h3>
              <p className="mt-2 text-base text-gray-600">
                Real-time messaging system for seamless communication between buyers and sellers within your campus.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg  hover:bg-blue-50 transition-shadow duration-200">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Secure Platform</h3>
              <p className="mt-2 text-base text-gray-600">
                Verified college users only. Safe transactions and protected personal information.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-32 ">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">1</div>
              <h3 className="mt-4 text-lg font-medium">Sign Up</h3>
              <p className="mt-2 text-gray-600">Register with your college email</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">2</div>
              <h3 className="mt-4 text-lg font-medium">List or Browse</h3>
              <p className="mt-2 text-gray-600">Add your books or find what you need</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">3</div>
              <h3 className="mt-4 text-lg font-medium">Connect</h3>
              <p className="mt-2 text-gray-600">Chat with buyers or sellers</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">4</div>
              <h3 className="mt-4 text-lg font-medium">Exchange</h3>
              <p className="mt-2 text-gray-600">Meet up and complete the sale</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 bg-blue-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">Counting...</div>
              <div className="mt-2 text-gray-600">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">Counting...</div>
              <div className="mt-2 text-gray-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">Counting...</div>
              <div className="mt-2 text-gray-600">Daily Transactions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;