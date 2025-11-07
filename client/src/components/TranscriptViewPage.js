import React, { useState } from 'react';
import { ArrowLeft, Download, Share2, Copy, Search, Play } from 'lucide-react';

const TranscriptViewPage = ({ transcript, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample transcript text
  const transcriptText = `
[00:00:00] Welcome to this lecture on React Hooks. Today we'll be covering the fundamentals of useState and useEffect.

[00:00:15] First, let's talk about useState. This is one of the most commonly used hooks in React. It allows you to add state to functional components.

[00:00:45] The syntax is simple: const [state, setState] = useState(initialValue). The first element in the array is the current state value, and the second is a function to update it.

[00:01:20] Now let's move on to useEffect. This hook lets you perform side effects in functional components. It's similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.

[00:02:00] UseEffect takes two arguments: a function and a dependency array. The function contains the side effect logic, and the dependency array determines when the effect runs.

[00:02:45] Here's an example: useEffect(() => { document.title = 'New Title'; }, [count]). This updates the document title whenever count changes.

[00:03:30] It's important to understand the dependency array. If you pass an empty array, the effect only runs once after the initial render, similar to componentDidMount.

[00:04:15] If you omit the dependency array entirely, the effect runs after every render. This can lead to performance issues, so use it carefully.

[00:05:00] Let's look at some practical examples. Suppose you want to fetch data from an API when a component mounts. You can use useEffect with an empty dependency array.

[00:05:45] Remember to handle cleanup in your effects. If you subscribe to something, make sure to unsubscribe when the component unmounts by returning a cleanup function.

[00:06:30] That wraps up our introduction to React Hooks. Practice these concepts, and you'll become proficient in no time. Thanks for watching!
  `.trim();

  const highlightSearch = (text) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchTerm.toLowerCase() 
        ? `<mark class="bg-yellow-200">${part}</mark>` 
        : part
    ).join('');
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{transcript.title}</h1>
              <p className="text-gray-600">Duration: {transcript.duration} • {transcript.date}</p>
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

        {/* Video Player Placeholder */}
        <div className="bg-gray-900 rounded-xl mb-8 aspect-video flex items-center justify-center">
          <button className="bg-white/20 hover:bg-white/30 p-6 rounded-full transition">
            <Play className="w-12 h-12 text-white" />
          </button>
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
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
              <Copy className="w-4 h-4" />
              <span>Copy All</span>
            </button>
          </div>
          
          <div className="prose max-w-none">
            <div 
              className="text-gray-700 leading-relaxed whitespace-pre-wrap font-mono text-sm"
              dangerouslySetInnerHTML={{ __html: highlightSearch(transcriptText) }}
            />
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