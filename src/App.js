import React from 'react';
import './index.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl font-bold">Writing Platform</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<p className="p-4">Welcome to your Writing Platform</p>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
