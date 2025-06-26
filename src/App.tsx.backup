import React, { useState } from 'react';

interface FileInfo {
  fileName: string;
  fileSize: string;
  fileType: string;
  directLink: string;
  fileId: string;
  resolvedLink?: string;
}

const TERADOWNLOADER_URL = 'https://teradownloader.com/download?l=';

function App() {
  const [link, setLink] = useState('');
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleParse = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFileInfo(null);
    setLoading(true);
    try {
      const res = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Unknown error');
      setFileInfo(data);
    } catch (err: any) {
      setError(err.message || 'Failed to parse link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="w-full max-w-2xl flex flex-col items-center mb-6">
        {/* Play icon SVG for TeraPlayer branding */}
        <div className="mb-2">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="28" r="28" fill="#2563eb"/>
            <polygon points="22,18 40,28 22,38" fill="#fff"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">teraboxplayer</h1>
      </header>
      <form onSubmit={handleParse} className="w-full max-w-md bg-white rounded shadow p-6 flex flex-col gap-4">
        <input
          type="text"
          className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          placeholder="Paste your Terabox link here..."
          value={link}
          onChange={e => setLink(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Downloading...' : 'Download'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {fileInfo && (
        <div className="mt-6 bg-white rounded shadow p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Download Your Terabox Video/File</h2>
          <div className="mb-2">Type: <span className="font-mono">{fileInfo.fileType}</span></div>
          <div className="mb-2 break-all text-xs text-gray-500">Original Link: <a href={fileInfo.directLink} className="underline" target="_blank" rel="noopener noreferrer">{fileInfo.directLink}</a></div>
          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href={TERADOWNLOADER_URL + encodeURIComponent(fileInfo.directLink)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
            <a
              href={TERADOWNLOADER_URL + encodeURIComponent(fileInfo.directLink)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Play
            </a>
          </div>
          <div className="mt-4 text-xs text-gray-600">
            teraboxplayer is not affiliated with Terabox or any third-party service. All trademarks and content belong to their respective owners.
          </div>
        </div>
      )}
      <footer className="mt-10 text-xs text-gray-400 text-center">
        © 2025 teraboxplayer. Not affiliated with Terabox or any third-party service. All trademarks and content belong to their respective owners.
        <div className="mt-2">
          <a href="/about" className="underline mr-4">About</a>
          <a href="/copyright-policy" className="underline">Copyright Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
