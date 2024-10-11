import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [inputText, setInputText] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Api_Key = 'ZkYfRXv45Dmrh19BIJKcRcBAvPQCcHYQrZ1s5370gMY'; // Consider moving to environment variables

  useEffect(() => {
    if (inputText.trim() === '') {
      setImageURL(null);
      return;
    }

    const fetchImage = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: inputText, page: 1, per_page: 1 },
          headers: {
            Authorization: `Client-ID ${Api_Key}`,
          },
        });

        if (response.data.results && response.data.results.length > 0) {
          setImageURL(response.data.results[0].urls.small);
        } else {
          setError('No images found.');
          setImageURL(null);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch image.');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [inputText, Api_Key]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className='text-2xl mb-4'>Image Generation App</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full border-gray-300 rounded p-2 mb-4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        {loading && <p>Loading...</p>}
        <br/>
        {error && <p className="text-red-500">{error}</p>}
        {imageURL && (
        
          <div className="mt-4">
            <img src={imageURL} alt="Generated" className="w-full rounded" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
