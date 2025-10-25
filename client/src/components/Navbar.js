import React, { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

const Navbar = ({ loggedIn, user, onLogout, onLoginClick, onSignupClick, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => onNavigate('home')} className="flex items-center space-x-2 cursor-pointer">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StudyHub
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className="text-gray-700 hover:text-blue-600 transition font-medium">
              Home
            </button>
            {loggedIn && (
              <>
                <button onClick={() => onNavigate('transcripts')} className="text-gray-700 hover:text-blue-600 transition font-medium">
                  My Transcripts
                </button>
                <button onClick={() => onNavigate('folders')} className="text-gray-700 hover:text-blue-600 transition font-medium">
                  My Folders
                </button>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {loggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Welcome, {user}!</span>
                <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button onClick={onLoginClick} className="px-4 py-2 text-blue-600 hover:text-blue-700 transition font-medium">
                  Login
                </button>
                <button onClick={onSignupClick} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
                  Sign Up Free
                </button>
              </>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600 transition">
              Home
            </button>
            {loggedIn && (
              <>
                <button onClick={() => { onNavigate('transcripts'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600 transition">
                  My Transcripts
                </button>
                <button onClick={() => { onNavigate('folders'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600 transition">
                  My Folders
                </button>
              </>
            )}
            {loggedIn ? (
              <button onClick={onLogout} className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Logout ({user})
              </button>
            ) : (
              <>
                <button onClick={onLoginClick} className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  Login
                </button>
                <button onClick={onSignupClick} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Sign Up Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;