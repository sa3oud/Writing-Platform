import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft } from 'lucide-react';

const WritingSpace = ({ selectedBook, onBack }) => {
  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState('');

  // Load saved content for the specific book
  useEffect(() => {
    if (selectedBook) {
      const savedBookContent = localStorage.getItem(`book_${selectedBook.title}`);
      if (savedBookContent) {
        setContent(savedBookContent);
        setSavedContent(savedBookContent);
      }
    }
  }, [selectedBook]);

  const handleSave = () => {
    if (selectedBook) {
      localStorage.setItem(`book_${selectedBook.title}`, content);
      setSavedContent(content);
    }
  };

  if (!selectedBook) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-md z-50 overflow-hidden">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={onBack} 
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <ArrowLeft className="mr-2" /> Back to Books
          </button>
          <h2 className="text-3xl font-light text-gray-800">{selectedBook.title}</h2>
          <button 
            onClick={handleSave}
            className="bg-gray-800 text-white px-4 py-2 rounded-md 
              hover:bg-gray-700 flex items-center transition-colors"
          >
            <Save className="mr-2" /> Save
          </button>
        </div>
        
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="w-full min-h-[70vh] text-xl font-light text-gray-700 
            bg-transparent border border-gray-300 p-4 rounded-lg 
            focus:outline-none focus:border-gray-500 resize-none"
        />
        
        {savedContent && (
          <div className="mt-4 text-sm text-gray-500">
            Last saved: {new Date().toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingSpace;
