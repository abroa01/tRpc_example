import { useState } from 'react';
import './App.css';
import trpcClient from './trpc';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    try {
      const response = await trpcClient.createShorturl.mutate({ url });
      setShortUrl(response);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-sm bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">URL Shorty</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your url here"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Shorten URL
          </button>
        </form>
        {shortUrl && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Your Shortened URL is: <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{shortUrl}</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
