import { useState, useEffect, useMemo } from 'react';
import { saveWritings, loadWritings } from '../utils/localStorage';

export const useWritings = () => {
  const [writings, setWritings] = useState([]);
  const [filteredWritings, setFilteredWritings] = useState([]);
  const [filterConfig, setFilterConfig] = useState({
    search: '',
    genre: ''
  });
  const [sortConfig, setSortConfig] = useState({ 
    key: 'createdAt', 
    direction: 'desc' 
  });

  // Load writings from local storage
  useEffect(() => {
    setWritings(loadWritings());
  }, []);

  // Save writings to local storage when they change
  useEffect(() => {
    saveWritings(writings);
  }, [writings]);

  // Filter and Sort Writings
  useEffect(() => {
    let result = [...writings];

    // Search Filter
    if (filterConfig.search) {
      result = result.filter(writing => 
        writing.title.toLowerCase().includes(filterConfig.search.toLowerCase()) ||
        writing.content.toLowerCase().includes(filterConfig.search.toLowerCase())
      );
    }

    // Genre Filter
    if (filterConfig.genre) {
      result = result.filter(writing => writing.genre === filterConfig.genre);
    }

    // Sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) 
        return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) 
        return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredWritings(result);
  }, [writings, filterConfig, sortConfig]);

  const addWriting = (writing) => {
    const newWriting = {
      ...writing,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleString(),
      likes: 0,
      liked: false
    };
    setWritings(prev => [...prev, newWriting]);
    return newWriting;
  };

  const updateWriting = (updatedWriting) => {
    setWritings(prev => 
      prev.map(w => w.id === updatedWriting.id ? updatedWriting : w)
    );
  };

  const deleteWriting = (id) => {
    setWritings(prev => prev.filter(w => w.id !== id));
  };

  const likeWriting = (id) => {
    setWritings(prev => 
      prev.map(writing => 
        writing.id === id 
          ? { 
              ...writing, 
              likes: (writing.likes || 0) + (writing.liked ? -1 : 1),
              liked: !writing.liked 
            } 
          : writing
      )
    );
  };

  const toggleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return {
    writings,
    filteredWritings,
    filterConfig,
    setFilterConfig,
    sortConfig,
    toggleSort,
    addWriting,
    updateWriting,
    deleteWriting,
    likeWriting
  };
};
