import React, { useState } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import TranscriptsPage from './components/TranscriptsPage';
import FoldersPage from './components/FoldersPage';
import FolderContentsPage from './components/FolderContentsPage';
import TranscriptViewPage from './components/TranscriptViewPage';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import Footer from './components/Footer';
import ChatSidebar from './components/ChatSidebar';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedTranscript, setSelectedTranscript] = useState(null);

  const handleLogin = (email, password) => {
    if (email && password) {
      setLoggedIn(true);
      setUser(email.split("@")[0]);
      setShowLogin(false);
    } else {
      alert("Please enter email and password");
    }
  };

  const handleSignup = (name, email, password) => {
    if (name && email && password) {
      setLoggedIn(true);
      setUser(name);
      setShowSignup(false);
    } else {
      alert("Please fill all fields");
    }
  };

  const handleGoogleLogin = () => {
    setLoggedIn(true);
    setUser("Google User");
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser("");
    setCurrentPage('home');
  };

  const handleGetStarted = () => {
    if (loggedIn) {
      setCurrentPage('transcripts');
    } else {
      setShowSignup(true);
    }
  };

  // ✅ When opening folder
  const handleOpenFolder = (folder) => {
    setSelectedFolder(folder);
    setCurrentPage('folderContents');
  };

  // ✅ Back from folderContents page
  const handleBackToFolders = () => {
    setSelectedFolder(null);
    setCurrentPage('folders');
  };

  // ✅ View transcript
  const handleViewTranscript = (transcript) => {
    setSelectedTranscript(transcript);
    setCurrentPage('transcriptView');
  };

  // ✅ Back from transcript view
  const handleBackFromTranscript = () => {
    setSelectedTranscript(null);
    if (selectedFolder) {
      setCurrentPage('folderContents');
    } else {
      setCurrentPage('transcripts');
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <AnimatedBackground />
      
      <Navbar 
        loggedIn={loggedIn}
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
        onNavigate={setCurrentPage}
      />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage 
            onGetStarted={handleGetStarted} 
            onNavigate={setCurrentPage}
            loggedIn={loggedIn}
          />
        )}

        {currentPage === 'transcripts' && (
          <TranscriptsPage onViewTranscript={handleViewTranscript} />
        )}

        {currentPage === 'folders' && (
          <FoldersPage onOpenFolder={handleOpenFolder} />
        )}

        {currentPage === 'folderContents' && selectedFolder && (
          <FolderContentsPage 
            folder={selectedFolder}      // ✅ CHANGED
            onBack={handleBackToFolders} // ✅ CHANGED
          />
        )}

        {currentPage === 'transcriptView' && selectedTranscript && (
          <TranscriptViewPage 
            transcript={selectedTranscript}
            onBack={handleBackFromTranscript}
          />
        )}
      </main>

      <Footer onNavigate={setCurrentPage} />

      {/* Chat Sidebar always when logged in */}
      {loggedIn && <ChatSidebar />}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onGoogleLogin={handleGoogleLogin}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSignup={handleSignup}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          onGoogleLogin={handleGoogleLogin}
        />
      )}
    </div>
  );
}

export default App;
