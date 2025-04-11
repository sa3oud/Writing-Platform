import React from 'react';
import { Book } from 'lucide-react';

const books = [
  {
    title: "Etymolopathia",
    description: "A profound exploration of linguistic origins and psychological pathways",
    spine: "bg-gradient-to-r from-gold-300 to-gold-500"
  },
  {
    title: "Anecdodo",
    description: "A collection of whimsical and thought-provoking anecdotes",
    spine: "bg-gradient-to-r from-lavender-300 to-lavender-500"
  },
  {
    title: "Awaaah",
    description: "An introspective journey through human emotions and expressions",
    spine: "bg-gradient-to-r from-rose-300 to-rose-500"
  },
  {
    title: "No mum, we'll not meet in heaven",
    description: "A provocative narrative challenging familial and spiritual constructs",
    spine: "bg-gradient-to-r from-indigo-300 to-indigo-500"
  }
];

const BookIcon = ({ book, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className="book-icon cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <div className={`book-spine ${book.spine} w-12 h-48 rounded-sm shadow-lg relative`}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 text-white text-xs text-center whitespace-nowrap">
          {book.title}
        </div>
      </div>
      <div className="book-cover bg-white w-36 h-48 border-2 border-gray-200 rounded-sm shadow-md flex items-center justify-center">
        <Book className="text-gray-400" size={48} />
      </div>
    </div>
  );
};

const BookCollection = ({ onSelectBook }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex space-x-6 justify-center">
        {books.map((book, index) => (
          <BookIcon 
            key={index} 
            book={book} 
            onSelect={() => onSelectBook(book)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookCollection;
