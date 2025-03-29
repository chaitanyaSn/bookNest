import { Link, useNavigate } from 'react-router-dom';
import React, { Fragment } from 'react';  // Import Fragment from React
import { useAuth } from '../../context/Authcontext';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { FaPaperPlane } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { motion } from 'framer-motion'
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
          <Link to="/" className="flex items-center">
  <motion.span 
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className="flex items-center"
  >
    {/* Book icon */}
    <motion.div
      animate={{
        rotate: [0, 5, -5, 0],
        y: [0, -5, 5, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="mr-2"
    >
      <svg 
        className="h-8 w-8 text-blue-500" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
    </motion.div>
    
    {/* Text with gradient and animation */}
    <motion.span 
      className="sm:text-3xl text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      style={{
        backgroundSize: '200% 200%'
      }}
    >
      BookNest
    </motion.span>
    
    
  </motion.span>
</Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
              
                <Link
                  to="/sell"
                  className="bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-cyan-400 "
                >
                  <span className="block sm:hidden">Sell</span> 
                  <span className="hidden sm:block">Sell Book</span>
                </Link>
                <Link
                  to="/messages"
                  className="bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-cyan-400"
                  title="Messages"
                >
                 <FaPaperPlane size={18} />
                </Link>

                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-md text-gray-700`}
                            >
                              <div className="flex items-center justify-between">
                              <span>Your Books</span> <IoBookSharp size={18} />
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block w-full text-left px-4 py-2 text-md text-gray-700`}
                            >
                              <div className="flex items-center justify-between">
                              <span>Sign out</span> <FaSignOutAlt size={18} />
                              </div>
                            
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 