import React, { useState } from 'react';
import './index.css';
import VersaceBackground from './components/VersaceBackground';
import BookCollection from './components/BookCollection';
import WritingSpace from './components/WritingSpace';
import Navigation from './components/Navigation';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeTab, setActiveTab] = useState('books');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'books') {
      setSelectedBook(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <VersaceBackground />
      <Navigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
      
      {activeTab === 'books' && (
        <BookCollection onSelectBook={(book) => {
          setSelectedBook(book);
          setActiveTab('write');
        }} />
      )}
      
      {activeTab === 'write' && selectedBook && (
        <WritingSpace 
          selectedBook={selectedBook} 
          onBack={() => setActiveTab('books')} 
        />
      )}
    </div>
  );
}

export default App;
