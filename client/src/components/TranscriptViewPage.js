import React, { useState } from 'react';
import { ArrowLeft, Download, Share2, Copy, Search, Play, Send, Bot, User } from 'lucide-react';
import { userAPI } from '../services/api';

const TranscriptViewPage = ({ transcript, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState(transcript.chat || []);
  const [chatLoading, setChatLoading] = useState(false);

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    setChatLoading(true);
    try {
      const res = await userAPI.chatWithTranscript(transcript.id, chatInput);
      setChatHistory(res.chat);
      setChatInput("");
    } catch (err) {
      alert('Error sending chat: ' + err.message);
    }
    setChatLoading(false);
  };

  // Sample transcript text
  // Use transcript content from props (backend fetched)
  const transcriptText = transcript?.transcript || '';

  const highlightSearch = (text) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchTerm.toLowerCase() 
        ? `<mark class="bg-yellow-200">${part}</mark>` 
        : part
    ).join('');
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(transcriptText);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{transcript.subject || transcript.title || 'Transcript'}</h1>
                <p className="text-gray-600">
                  {transcript.createdAt ? new Date(transcript.createdAt).toLocaleString() : 'Date unknown'}
                </p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search in transcript..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Transcript Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Transcript</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition" onClick={handleCopyTranscript}>
              <Copy className="w-4 h-4" />
              <span>Copy All</span>
            </button>
          </div>
          <div className="prose max-w-none">
            <div 
              className="text-gray-700 leading-relaxed whitespace-pre-wrap font-mono text-sm max-h-96 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: highlightSearch(transcriptText) }}
            />
          </div>

          {/* Chat Q&A Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" /> Ask Questions About This Transcript
            </h3>
            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-700">You:</span>
                    <span className="text-gray-800">{msg.question}</span>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-purple-700">GeminiAI:</span>
                    <span className="text-gray-800">{msg.answer}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask a question about this transcript..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                disabled={chatLoading}
                onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }}
              />
              <button
                onClick={handleSendChat}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                disabled={chatLoading}
              >
                <Send className="w-5 h-5" />
                {chatLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="bg-blue-50 text-blue-700 p-4 rounded-lg hover:bg-blue-100 transition text-center">
            <p className="font-semibold">Generate Summary</p>
            <p className="text-sm mt-1">Get AI-powered summary</p>
          </button>
          <button className="bg-purple-50 text-purple-700 p-4 rounded-lg hover:bg-purple-100 transition text-center">
            <p className="font-semibold">Create Quiz</p>
            <p className="text-sm mt-1">Test your knowledge</p>
          </button>
          <button className="bg-green-50 text-green-700 p-4 rounded-lg hover:bg-green-100 transition text-center">
            <p className="font-semibold">Export Notes</p>
            <p className="text-sm mt-1">Download as PDF</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranscriptViewPage;