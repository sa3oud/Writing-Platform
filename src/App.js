import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PlusCircle, Book, Settings } from 'lucide-react';
import './index.css';

// Placeholder components - we'll develop these fully later
const WritingList = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Your Writings</h2>
    <p className="text-gray-600">No writings yet. Start by adding a new one!</p>
  </div>
);

const WriteNew = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Create New Writing</h2>
    <form className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Title</label>
        <input 
          type="text" 
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your writing title"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Content</label>
        <textarea 
          className="w-full px-3 py-2 border rounded-md h-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Start writing your masterpiece..."
        ></textarea>
      </div>
      <button 
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
      >
        <PlusCircle className="mr-2" /> Save Writing
      </button>
    </form>
  </div>
);

const Settings = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Settings</h2>
    <div className="bg-gray-100 p-4 rounded-md">
      <p className="text-gray-600">Customize your Writing Portfolio</p>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('writings');

  const NavButton = ({ icon: Icon, label, tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
        activeTab === tab 
          ? 'bg-blue-500 text-white' 
          : 'text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Writing Portfolio</h1>
          <nav className="flex space-x-4">
            <NavButton icon={Book} label="Writings" tab="writings" />
            <NavButton icon={PlusCircle} label="New" tab="new" />
            <NavButton icon={Settings} label="Settings" tab="settings" />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'writings' && <WritingList />}
        {activeTab === 'new' && <WriteNew />}
        {activeTab === 'settings' && <Settings />}
      </main>
    </div>
  );
}

export default App;
