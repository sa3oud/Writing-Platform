import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Github } from 'lucide-react';
import { Octokit } from '@octokit/rest';

const WritingSpace = ({ selectedBook, onBack }) => {
  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [githubToken, setGithubToken] = useState('');
  const [gistId, setGistId] = useState(null);

  // Unique gist filename based on book title
  const gistFilename = `${selectedBook.title.replace(/\s+/g, '_')}.txt`;

  // Check for existing GitHub token
  useEffect(() => {
    const storedToken = localStorage.getItem('github_token');
    if (storedToken) {
      setGithubToken(storedToken);
    }
  }, []);

  // Load content from local storage first
  useEffect(() => {
    const localContent = localStorage.getItem(`local_${gistFilename}`);
    if (localContent) {
      setContent(localContent);
      setSavedContent(localContent);
    }
  }, [gistFilename]);

  const handleGitHubAuth = async () => {
    const token = prompt('Enter your GitHub Personal Access Token:');
    if (token) {
      try {
        const octokit = new Octokit({ auth: token });
        
        // Verify token by getting user info
        await octokit.users.getAuthenticated();
        
        // Save token
        localStorage.setItem('github_token', token);
        setGithubToken(token);
        alert('GitHub authentication successful!');
      } catch (error) {
        alert('Authentication failed. Please check your token.');
        console.error(error);
      }
    }
  };

  const handleSave = async () => {
    if (!content.trim()) return;

    // Save to local storage first
    localStorage.setItem(`local_${gistFilename}`, content);
    setSavedContent(content);
    setLastSaved(new Date());

    // If GitHub token exists, save to Gist
    if (githubToken) {
      try {
        const octokit = new Octokit({ auth: githubToken });
        
        const gistData = {
          description: `Writing for ${selectedBook.title}`,
          public: false,
          files: {
            [gistFilename]: { content }
          }
        };

        let response;
        if (gistId) {
          // Update existing gist
          response = await octokit.gists.update({
            gist_id: gistId,
            ...gistData
          });
        } else {
          // Create new gist
          response = await octokit.gists.create(gistData);
          setGistId(response.data.id);
        }

        alert('Saved to GitHub Gist successfully!');
      } catch (error) {
        alert('Failed to save to GitHub Gist');
        console.error(error);
      }
    }
  };

  const handleLoadFromGist = async () => {
    if (!githubToken) {
      alert('Please authenticate with GitHub first');
      return;
    }

    try {
      const octokit = new Octokit({ auth: githubToken });
      
      // Fetch user's gists
      const { data: gists } = await octokit.gists.listForAuthenticated();
      
      // Find gist with our filename
      const matchingGist = gists.find(gist => 
        Object.keys(gist.files).includes(gistFilename)
      );

      if (matchingGist) {
        const fileContent = matchingGist.files[gistFilename].content;
        setContent(fileContent);
        setSavedContent(fileContent);
        setGistId(matchingGist.id);
        alert('Loaded from GitHub Gist successfully!');
      } else {
        alert('No saved gist found for this book');
      }
    } catch (error) {
      alert('Failed to load from GitHub Gist');
      console.error(error);
    }
  };

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
          <div className="flex space-x-2">
            {!githubToken ? (
              <button 
                onClick={handleGitHubAuth}
                className="bg-gray-800 text-white px-4 py-2 rounded-md 
                  hover:bg-gray-700 flex items-center transition-colors"
              >
                <Github className="mr-2" /> Connect GitHub
              </button>
            ) : (
              <>
                <button 
                  onClick={handleSave}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md 
                    hover:bg-indigo-700 flex items-center transition-colors"
                >
                  <Save className="mr-2" /> Save to Gist
                </button>
                <button 
                  onClick={handleLoadFromGist}
                  className="bg-green-600 text-white px-4 py-2 rounded-md 
                    hover:bg-green-700 flex items-center transition-colors"
                >
                  Load from Gist
                </button>
              </>
            )}
          </div>
        </div>
        
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="w-full min-h-[70vh] text-xl font-light text-gray-700 
            bg-transparent border border-gray-300 p-4 rounded-lg 
            focus:outline-none focus:border-indigo-500 resize-none"
        />
        
        <div className="mt-4 text-sm text-gray-500">
          {lastSaved && `Last saved: ${lastSaved.toLocaleString()}`}
        </div>
      </div>
    </div>
  );
};

export default WritingSpace;
