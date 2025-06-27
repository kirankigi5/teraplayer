import React, { useState } from 'react';
import ThemeToggle from './components/ThemeToggle';

interface FileInfo {
  fileName?: string;
  fileSize?: string;
  fileType: string;
  directLink: string;
  fileId?: string;
  resolvedLink?: string;
  playUrl?: string;
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4 transition-colors duration-200">
      {/* Theme Toggle - positioned at top right */}
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <header className="w-full max-w-2xl flex flex-col items-center mb-6">
        {/* Play icon SVG for TeraPlayer branding */}
        <div className="mb-2">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="28" r="28" fill="#2563eb"/>
            <polygon points="22,18 40,28 22,38" fill="#fff"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">TeraBox Video Player Online</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-1">Free TeraBox Player & Downloader - All Domains Supported</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">TeraBox • MirroBox • NephoBox • 4FunBox • FreeteraBox • 1024Tera • TibiBox • MomeryBox</p>
      </header>
      <form onSubmit={handleParse} className="w-full max-w-md bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col gap-4">
        <div>
          <label htmlFor="terabox-link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            TeraBox Link or URL
          </label>
          <input
            id="terabox-link"
            type="text"
            className="border dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Paste your TeraBox, MirroBox, NephoBox, or any supported link..."
            value={link}
            onChange={e => setLink(e.target.value)}
            required
            aria-describedby="link-help"
          />
          <p id="link-help" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Supports all TeraBox domains: terabox.com, mirrobox.com, nephobox.com, 4funbox.co, and more
          </p>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Processing TeraBox Link...' : 'Enter TeraBox Link'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 dark:text-red-400">{error}</div>}
      {fileInfo && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded shadow p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">TeraBox Video Ready to Play</h2>
          {fileInfo.fileName && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">File Name:</span> 
              <span className="ml-1 text-gray-900 dark:text-white">{fileInfo.fileName}</span>
            </div>
          )}
          {fileInfo.fileSize && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">File Size:</span> 
              <span className="ml-1 text-gray-900 dark:text-white">{fileInfo.fileSize}</span>
            </div>
          )}
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">File Type:</span> 
            <span className="ml-1 font-mono text-gray-900 dark:text-white">{fileInfo.fileType}</span>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href={fileInfo.playUrl || fileInfo.directLink}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition flex items-center"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Play ${fileInfo.fileName || 'video'} online`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10v18a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h6l4 4z" />
              </svg>
              Play TeraBox Video Online
            </a>
            <a
              href={TERADOWNLOADER_URL + encodeURIComponent(fileInfo.directLink)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition flex items-center"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Download ${fileInfo.fileName || 'file'}`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download TeraBox File
            </a>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded text-xs text-blue-700 dark:text-blue-300">
            <strong>✓ TeraBox Video Player Online:</strong> Play your TeraBox videos directly without downloading. 
            Our free TeraBox online player supports all video formats and requires no login.
          </div>
          
          <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            TeraPlayer is not affiliated with TeraBox. All trademarks belong to their respective owners.
          </div>
        </div>
      )}
      
      {/* SEO Content Section */}
      <section className="mt-10 max-w-2xl bg-white dark:bg-gray-800 rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">How to Play TeraBox Videos Online</h2>
        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <p>
            <strong>TeraBox Video Player Online:</strong> Simply paste your TeraBox link above to play videos directly in your browser. 
            Our free TeraBox online player works with all video formats without requiring login or downloads.
          </p>
          <p>
            <strong>TeraBox Video Downloader:</strong> Download TeraBox files directly to your device. 
            Convert TeraBox links to direct download links for offline viewing.
          </p>
          <p>
            <strong>Features:</strong> Free TeraBox player • No login required • All video formats supported • 
            TeraBox link converter • Direct TeraBox streaming • Fast TeraBox downloader
          </p>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <strong>Popular searches:</strong> terabox video player online, terabox online video player, 
            terabox video downloader, how to play videos on terabox, terabox player, terabox online player, 
            terabox direct download, terabox link converter
          </p>
        </div>
      </section>

      {/* Supported Domains Section */}
      <section className="mt-6 max-w-2xl bg-white dark:bg-gray-800 rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Supported TeraBox URLs & Domains</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Our TeraBox player supports all major TeraBox domains and mirrors. Simply paste any of these links:
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono bg-gray-50 dark:bg-gray-700 p-4 rounded">
          <div className="text-blue-600 dark:text-blue-400">terabox.com</div>
          <div className="text-blue-600 dark:text-blue-400">www.terabox.com</div>
          <div className="text-blue-600 dark:text-blue-400">terabox.app</div>
          <div className="text-blue-600 dark:text-blue-400">terabox.fun</div>
          <div className="text-blue-600 dark:text-blue-400">teraboxapp.com</div>
          <div className="text-blue-600 dark:text-blue-400">mirrobox.com</div>
          <div className="text-blue-600 dark:text-blue-400">www.mirrobox.com</div>
          <div className="text-blue-600 dark:text-blue-400">nephobox.com</div>
          <div className="text-blue-600 dark:text-blue-400">www.nephobox.com</div>
          <div className="text-blue-600 dark:text-blue-400">freeterabox.com</div>
          <div className="text-blue-600 dark:text-blue-400">www.freeterabox.com</div>
          <div className="text-blue-600 dark:text-blue-400">1024tera.com</div>
          <div className="text-blue-600 dark:text-blue-400">www.1024tera.co</div>
          <div className="text-blue-600 dark:text-blue-400">4funbox.co</div>
          <div className="text-blue-600 dark:text-blue-400">www.4funbox.com</div>
          <div className="text-blue-600 dark:text-blue-400">momerybox.com</div>
          <div className="text-blue-600 dark:text-blue-400">www.momerybox.com</div>
          <div className="text-blue-600 dark:text-blue-400">tibibox.com</div>
          <div className="text-blue-600 dark:text-blue-400">www.tibibox.com</div>
          <div className="text-green-600 dark:text-green-400">+ Short URLs</div>
        </div>
        
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded">
          <h3 className="font-semibold text-green-800 dark:text-green-300 text-sm mb-2">✓ All TeraBox Mirrors Supported</h3>
          <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
            <li>• Official TeraBox domains (terabox.com, terabox.app)</li>
            <li>• Mirror sites (mirrobox.com, nephobox.com, 4funbox.co)</li>
            <li>• Alternative domains (freeterabox.com, 1024tera.com)</li>
            <li>• Regional variants (tibibox.com, momerybox.com)</li>
            <li>• Short URLs and redirects (t.co, bit.ly)</li>
          </ul>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="mt-6 max-w-2xl bg-white dark:bg-gray-800 rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">How to Download & Play TeraBox Files</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Copy TeraBox Link</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Copy your TeraBox link from anywhere - Telegram, WhatsApp, Twitter, or any social platform</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Paste & Parse</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Paste the link in the input box above and click "Play TeraBox Video Online"</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Play or Download</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Choose to play the video online or download it directly to your device</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-10 text-xs text-gray-400 dark:text-gray-500 text-center max-w-2xl">
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Free TeraBox Video Player & Downloader Online</h3>
          <p className="text-xs leading-relaxed">
            Best free TeraBox online video player and downloader supporting all TeraBox domains. Play TeraBox videos directly in your browser, 
            download TeraBox files, and convert TeraBox links without login. Supports terabox.com, mirrobox.com, nephobox.com, 4funbox.co, 
            freeterabox.com, 1024tera.com, tibibox.com, momerybox.com and all TeraBox formats.
          </p>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
          <div className="mb-2">
            <strong className="text-gray-600 dark:text-gray-300">Supported Domains:</strong> 
            <span className="ml-1">TeraBox.com • MirroBox.com • NephoBox.com • 4FunBox.co • FreeteraBox.com • 1024Tera.com • TibiBox.com • MomeryBox.com</span>
          </div>
          © 2025 TeraPlayer - Free TeraBox Video Player Online. Not affiliated with TeraBox, Flextech Inc, or any mentioned domains.
          <div className="mt-2 space-x-4">
            <a href="/about" className="underline hover:text-gray-600 dark:hover:text-gray-300">About TeraBox Player</a>
            <span className="mx-2">|</span>
            <a href="/copyright-policy" className="underline hover:text-gray-600 dark:hover:text-gray-300">Copyright Policy</a>
            <span className="mx-2">|</span>
            <a href="/privacy-policy" className="underline hover:text-gray-600 dark:hover:text-gray-300">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="/contact" className="underline hover:text-gray-600 dark:hover:text-gray-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
