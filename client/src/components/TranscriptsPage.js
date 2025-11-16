import React, { useState, useEffect } from 'react';
import { Search, Plus, Clock, Folder, Edit, Download, Trash2, FileVideo, FileText } from 'lucide-react';
import { userAPI } from '../services/api';

const TranscriptsPage = ({ onViewTranscript }) => {
  const [transcripts, setTranscripts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch transcripts on mount
  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getTranscripts();
        setTranscripts(data || []);
      } catch (err) {
        setError(err.message || 'Failed to load transcripts');
        setTranscripts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTranscripts();
  }, []);

  const filteredTranscripts = transcripts.filter(t => 
    t.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteTranscript = async (id) => {
    if (window.confirm("Are you sure you want to delete this transcript?")) {
      try {
        await userAPI.deleteTranscript(id);
        setTranscripts(prev => prev.filter(t => (t._id || t.id) !== id));
      } catch (err) {
        alert(err.message || 'Failed to delete transcript');
      }
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Transcripts</h1>
          <p className="text-gray-600">
            Manage and search through all your lecture transcripts
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transcripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Upload New Lecture</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading transcripts...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredTranscripts.map((transcript) => (
              <div key={transcript._id || transcript.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FileVideo className="w-8 h-8 text-blue-600" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {transcript.subject || transcript.title || 'Untitled Transcript'}
                      </h3>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {transcript.createdAt && (
                          <span>{new Date(transcript.createdAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Edit className="w-5 h-5" />
                    </button>

                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition">
                      <Download className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => deleteTranscript(transcript._id || transcript.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => onViewTranscript(transcript)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View Transcript
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredTranscripts.length === 0 && !error && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No transcripts found
            </h3>
            <p className="text-gray-600">
              Upload your first lecture to get started!
            </p>
          </div>
        )}
      </div>
        </div>
      );
    };

    export default TranscriptsPage;
