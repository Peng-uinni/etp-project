import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, FileVideo, Clock } from "lucide-react";

const FolderContentsPage = ({ folder, onBack }) => {

  // Fetch transcripts from the folder
  const [transcripts, setTranscripts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFolderTranscripts = async () => {
      try {
        setLoading(true);
        // TODO: Implement API to fetch transcripts by folder
        // For now, use dummy data - this will be replaced with folder-specific transcripts
        setTranscripts([]);
      } catch (err) {
        setError(err.message || 'Failed to load transcripts');
      } finally {
        setLoading(false);
      }
    };

    if (folder?.id) {
      fetchFolderTranscripts();
    }
  }, [folder?.id]);

  const filtered = transcripts.filter((t) =>
    t.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ✅ BACK BUTTON */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Folders</span>
        </button>

        {/* ✅ HEADER */}
        <h1 className="text-4xl font-bold text-gray-900">
          {folder?.name || "Folder"}
        </h1>
        <p className="text-gray-600 mb-8">
          {filtered.length} transcripts inside this folder
        </p>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}


        {/* ✅ SEARCH */}
        <div className="mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transcripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading transcripts...</div>
          </div>
        ) : (
          <>
            {/* ✅ TRANSCRIPT LIST */}
            <div className="grid grid-cols-1 gap-6">
              {filtered.map((transcript) => (
            <div
              key={transcript.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
            >
              <div className="flex items-start space-x-4">

                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileVideo className="w-8 h-8 text-blue-600" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {transcript.subject || transcript.title || 'Untitled'}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {transcript.createdAt && (
                          <span>{new Date(transcript.createdAt).toLocaleDateString()}</span>
                        )}
                  </div>
                </div>

              </div>
            </div>
              ))}
            </div>

            {/* ✅ EMPTY STATE */}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <FileVideo className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No transcripts found
                </h3>
                <p className="text-gray-600">Try a different search term</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default FolderContentsPage;
