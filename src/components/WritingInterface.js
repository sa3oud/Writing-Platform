import React, { useState, useEffect } from 'react';
import { Save, Plus, Edit, Trash2 } from 'lucide-react';

const WritingInterface = () => {
  const [writings, setWritings] = useState([]);
  const [currentWriting, setCurrentWriting] = useState({
    title: '',
    content: '',
    id: null
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load writings from local storage on component mount
  useEffect(() => {
    const savedWritings = JSON.parse(localStorage.getItem('writings') || '[]');
    setWritings(savedWritings);
  }, []);

  // Save writings to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('writings', JSON.stringify(writings));
  }, [writings]);

  const handleSave = () => {
    if (!currentWriting.title.trim() && !currentWriting.content.trim()) return;

    if (currentWriting.id) {
      // Update existing writing
      setWritings(writings.map(w => 
        w.id === currentWriting.id 
          ? {...currentWriting, updatedAt: new Date().toLocaleString()} 
          : w
      ));
    } else {
      // Create new writing
      const newWriting = {
        ...currentWriting,
        id: Date.now().toString(),
        createdAt: new Date().toLocaleString()
      };
      setWritings([...writings, newWriting]);
    }

    // Reset current writing state
    setCurrentWriting({ title: '', content: '', id: null });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    setWritings(writings.filter(w => w.id !== id));
  };

  const handleEdit = (writing) => {
    setCurrentWriting(writing);
    setIsEditing(true);
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <input 
          type="text"
          placeholder="Writing Title"
          value={currentWriting.title}
          onChange={(e) => setCurrentWriting(prev => ({...prev, title: e.target.value}))}
          className="w-full text-3xl font-light text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500 mb-4"
        />
        <textarea 
          placeholder="Start writing..."
          value={currentWriting.content}
          onChange={(e) => setCurrentWriting(prev => ({...prev, content: e.target.value}))}
          className="w-full min-h-[300px] text-xl font-light text-gray-700 bg-transparent border border-gray-300 focus:outline-none focus:border-gray-500 p-4 rounded-lg"
        />
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={handleSave}
            className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <Save className="mr-2" /> {isEditing ? 'Update' : 'Save'}
          </button>
          {isEditing && (
            <button 
              onClick={() => {
                setCurrentWriting({ title: '', content: '', id: null });
                setIsEditing(false);
              }}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {writings.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-light text-gray-800 mb-6 border-b pb-2">Your Writings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {writings.map(writing => (
              <div 
                key={writing.id} 
                className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-md relative"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {writing.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {writing.content}
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  Created: {writing.createdAt}
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button 
                    onClick={() => handleEdit(writing)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(writing.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingInterface;
