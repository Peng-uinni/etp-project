import React from 'react';
import { Video, FileText, Folder } from 'lucide-react';

const HomePage = ({ onGetStarted, onNavigate, loggedIn }) => {
  const handleCardClick = (page) => {
    if (loggedIn) {
      onNavigate(page);
    } else {
      onGetStarted(); // Show signup modal
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
              🚀 AI-Powered Learning Platform
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Your Classes,{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Way.
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload lectures, get instant AI-powered transcripts, and organize your study materials — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium text-lg"
            >
              Get Started Free
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div 
              onClick={() => handleCardClick('transcripts')}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
            >
              <Video className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Lectures</h3>
              <p className="text-gray-600">Upload your video or audio lectures and let AI do the work</p>
              <button className="mt-4 text-blue-600 font-medium hover:text-blue-700">
                {loggedIn ? 'Go to Transcripts →' : 'Get Started →'}
              </button>
            </div>

            <div 
              onClick={() => handleCardClick('transcripts')}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
            >
              <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Transcription</h3>
              <p className="text-gray-600">Get accurate transcripts instantly with searchable text</p>
              <button className="mt-4 text-purple-600 font-medium hover:text-purple-700">
                {loggedIn ? 'View Transcripts →' : 'Get Started →'}
              </button>
            </div>

            <div 
              onClick={() => handleCardClick('folders')}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
            >
              <Folder className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Organize Smart</h3>
              <p className="text-gray-600">Create folders and keep all your study materials organized</p>
              <button className="mt-4 text-green-600 font-medium hover:text-green-700">
                {loggedIn ? 'Manage Folders →' : 'Get Started →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;