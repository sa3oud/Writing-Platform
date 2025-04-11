import React from 'react';
import { Book, Edit, Trash2, Tag, Clock, Heart } from 'lucide-react';

const WritingCard = ({ writing, onView, onEdit, onDelete, onLike }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {writing.title}
          </h3>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(writing)} 
              className="text-gray-500 hover:text-blue-500 transition-colors"
              title="Edit"
            >
              <Edit size={20} />
            </button>
            <button 
              onClick={() => onDelete(writing.id)} 
              className="text-gray-500 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {writing.content}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span className="text-sm">{writing.createdAt}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag size={16} />
              <span className="text-sm">{writing.genre || 'Uncategorized'}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onLike(writing.id)}
              className="text-gray-500 hover:text-red-500 transition-colors flex items-center"
            >
              <Heart size={20} className={writing.liked ? 'fill-red-500 text-red-500' : ''} />
              <span className="ml-1 text-sm">{writing.likes || 0}</span>
            </button>
            
            <button 
              onClick={() => onView(writing)}
              className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors flex items-center"
            >
              Read More
              <Book size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingCard;
