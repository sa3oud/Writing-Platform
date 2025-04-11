import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { GENRES } from '../constants/genres';

const WritingModal = ({ isOpen, onClose, writing, onSave }) => {
  const [title, setTitle] = useState(writing?.title || '');
  const [content, setContent] = useState(writing?.content || '');
  const [genre, setGenre] = useState(writing?.genre || '');

  // Reset form when writing changes
  useEffect(() => {
    if (writing) {
      setTitle(writing.title || '');
      setContent(writing.content || '');
      setGenre(writing.genre || '');
    } else {
      setTitle('');
      setContent('');
      setGenre('');
    }
  }, [writing]);

  const handleSave = () => {
    const writingData = {
      ...writing,
      title,
      content,
      genre,
      updatedAt: new Date().toLocaleString()
    };
    onSave(writingData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter writing title"
            className="w-full text-2xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="p-6 flex-grow">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Genre</label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genreOption) => (
                <button
                  key={genreOption}
                  onClick={() => setGenre(genreOption)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    genre === genreOption 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {genreOption}
                </button>
              ))}
            </div>
          </div>
          
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your masterpiece here..."
            className="w-full h-[calc(100%-100px)] resize-none text-gray-700 focus:outline-none"
          />
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
            disabled={!title.trim() || !content.trim()}
          >
            <PlusCircle className="mr-2" size={20} />
            Save Writing
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingModal;
