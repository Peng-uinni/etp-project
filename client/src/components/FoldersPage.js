import React, { useState, useEffect } from 'react';
import { Folder, Plus, Trash2, X } from 'lucide-react';
import { userAPI } from '../services/api';

const FoldersPage = ({ onOpenFolder }) => {
  const [folders, setFolders] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);

  // Fetch folders on mount
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getFolders();
        setFolders(data || []);
      } catch (err) {
        setError(err.message || 'Failed to load folders');
        setFolders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const createFolder = async () => {
    if (!newFolderName.trim()) {
      alert('Please enter a folder name');
      return;
    }

    setCreatingFolder(true);
    try {
      const response = await userAPI.createFolder({ name: newFolderName });
      const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500"];
      setFolders([
        ...folders,
        {
          id: response.id || Date.now(),
          name: newFolderName,
          count: 0,
          color: colors[Math.floor(Math.random() * colors.length)]
        }
      ]);
      setNewFolderName("");
      setShowCreateModal(false);
    } catch (err) {
      alert(err.message || 'Failed to create folder');
    } finally {
      setCreatingFolder(false);
    }
  };

  const deleteFolder = async (id) => {
    if (window.confirm("Are you sure you want to delete this folder? All transcripts will be moved to 'Uncategorized'.")) {
      try {
        await userAPI.deleteFolder(id);
        setFolders(folders.filter((f) => f._id !== id && f.id !== id));
      } catch (err) {
        alert(err.message || 'Failed to delete folder');
      }
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Folders</h1>
          <p className="text-gray-600">Organize your transcripts into folders</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-8">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Folder</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading folders...</div>
          </div>
        ) : (
          <>
            {/* FOLDER GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 relative group"
                >
                  <div className={`${folder.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                    <Folder className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{folder.name}</h3>
                  <p className="text-gray-600">{folder.count || 0} transcripts</p>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => deleteFolder(folder.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenFolder(folder)}
                    className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition"
                  >
                    Open Folder
                  </button>
                </div>
              ))}
            </div>

            {folders.length === 0 && (
              <div className="text-center py-12">
                <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No folders yet
                </h3>
                <p className="text-gray-600">
                  Create your first folder to organize your transcripts!
                </p>
              </div>
            )}
          </>
        )}

        {/* CREATE MODAL */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Folder</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Folder Name</label>
                  <input
                    type="text"
                    placeholder="Enter folder name..."
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createFolder}
                    disabled={creatingFolder}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {creatingFolder ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FoldersPage;
