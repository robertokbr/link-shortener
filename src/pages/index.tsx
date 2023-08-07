// pages/index.tsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = async () => {
    try {
      const response = await axios.post('/api/shorten', { url: longUrl });
      const url = response.data.shortUrl;
      const shortUrl = `${window.location.origin}/${url}`;
      setShortUrl(shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div className='container'>
      <div className='content'>
        <h1>Link Shortener ✂️</h1>
        <input
          type="text"
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={handleShorten}>Shorten</button>
        {shortUrl && (
          <div>
            <strong>Short URL: <a href={shortUrl}>{shortUrl}</a></strong>
          </div>
        )}
      </div>
      <div className='footer'>
        <p className='credits'>
          © 2023 Roberto Junior
        </p>
      </div>
    </div>
  );
}
