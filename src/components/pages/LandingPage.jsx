import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';
import { motion } from 'framer-motion';

function LandingPage() {
  const { user } = useAuth();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20"
      >
        <div className="text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl"
          >
            <span className="block xl:inline">Welcome to</span>{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 xl:inline animate-gradient">
              BookNest
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-5 max-w-md mx-auto text-lg text-gray-600 sm:text-xl md:mt-7 md:max-w-3xl md:text-2xl"
          >
            Your campus marketplace for textbooks. Exchange knowledge, save money, and connect with fellow students.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex justify-center gap-4"
          >
            {user ? (
              <div className="flex flex-col gap-10 sm:flex-row ">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/books"
                    className="px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Browse Books
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/sell"
                    className="px-8 py-4 border-2 border-cyan-500 text-lg font-semibold rounded-lg text-cyan-600 bg-white hover:bg-cyan-50 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Sell a Book
                  </Link>
                </motion.div>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="px-10 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Floating book icons */}
        <motion.div 
          className="absolute top-1/4 left-10 opacity-20"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg className="h-16 w-16 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </motion.div>
        <motion.div 
          className="absolute top-1/3 right-20 opacity-20"
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <svg className="h-20 w-20 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-36 bg-white rounded-xl p-8 shadow-lg"
        >
          <motion.h2 
            whileInView={{ scale: [0.95, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-20"
          >
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Why Choose BookNest?
            </span>
          </motion.h2>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-10 md:grid-cols-3"
          >
            {[
              { 
                icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
                title: "Easy Listing",
                description: "List your books in minutes with our simple interface. Add photos, set your price, and reach potential buyers instantly."
              },
              { 
                icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
                title: "Direct Chat",
                description: "Real-time messaging system for seamless communication between buyers and sellers within your campus."
              },
              { 
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Secure Platform",
                description: "Verified college users only. Safe transactions and protected personal information."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -10 }}
                className="text-center p-8 rounded-xl hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mx-auto shadow-md"
                >
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                  </svg>
                </motion.div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-4 text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-36"
        >
          <motion.h2 
            whileInView={{ scale: [0.95, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-20"
          >
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              How It Works
            </span>
          </motion.h2>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 to-cyan-200 -z-10"></div>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {[
                { title: "Sign Up", description: "Register with your college email" },
                { title: "List or Browse", description: "Add your books or find what you need" },
                { title: "Connect", description: "Chat with buyers or sellers" },
                { title: "Exchange", description: "Meet up and complete the sale" }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center mx-auto text-2xl font-bold shadow-md"
                  >
                    {index + 1}
                  </motion.div>
                  <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-36 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-10 shadow-xl"
        >
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[
              { value: "500+", label: "Active Listings" },
              { value: "2K+", label: "Happy Users" },
              { value: "50+", label: "Daily Transactions" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  viewport={{ once: true }}
                  className="text-5xl font-bold text-white"
                >
                  {stat.value}
                </motion.div>
                <div className="mt-3 text-blue-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-36 text-center"
        >
          <motion.h2 
            whileInView={{ scale: [0.95, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 mb-6"
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 mb-10"
          >
            Join thousands of students saving money on textbooks today.
          </motion.p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={user ? "/books" : "/login"}
              className="inline-block px-12 py-4 text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {user ? "Browse Books" : "Create Account"}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LandingPage;