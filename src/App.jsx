import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "./context/Authcontext";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BookForm from "./components/books/BookForm";
import BookList from "./components/books/BookList";
import Dashboard from "./components/dashboard/Dashboard";
import ChatBox from "./components/chats/ChatBox";
import EditBook from "./components/books/EditBook";
import LandingPage from "./components/pages/LandingPage";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-200 pt-16">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<LandingPage />} />
              <Route
                path="/books"
                element={
                  <ProtectedRoute>
                    <BookList />
                  </ProtectedRoute>
                }
              />
            <Route
                path="/sell"
                element={
                  <ProtectedRoute>
                    <BookForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat/:userId"
                element={
                  <ProtectedRoute>
                    <ChatBox />
                  </ProtectedRoute>
                }
              />
                 <Route
                path="/edit/:bookId"
                element={
                  <ProtectedRoute>
                    <EditBook />
                  </ProtectedRoute>
                }
              />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
