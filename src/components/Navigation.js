import React from 'react';
import { Book, Edit, Settings } from 'lucide-react';

const Navigation = ({ activeTab, onTabChange }) => {
  const NavItem = ({ icon: Icon, label, tab }) => (
    <button
      onClick={() => onTabChange(tab)}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-full 
        transition-all duration-300 
        ${activeTab === tab 
          ? 'bg-white text-gray-900 shadow-md' 
          : 'text-white hover:bg-white hover:bg-opacity-10'}
      `}
    >
      <Icon size={20} />
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-full px-2 py-1 flex space-x-2">
        <NavItem icon={Book} label="Books" tab="books" />
        <NavItem icon={Edit} label="Write" tab="write" />
        <NavItem icon={Settings} label="Settings" tab="settings" />
      </div>
    </nav>
  );
};

export default Navigation;
