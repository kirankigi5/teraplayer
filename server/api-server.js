import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));

app.use(express.json());
app.use(helmet());

// Serve static files from the React frontend app
const staticPath = path.join(__dirname, '..', 'dist');
console.log(`Attempting to serve static files from: ${staticPath}`);
if (fs.existsSync(staticPath)) {
  console.log('Static path exists.');
} else {
  console.error('Static path does NOT exist. Build probably failed or path is wrong.');
}
app.use(express.static(staticPath));

// Serve ads.txt with correct content type
app.get('/ads.txt', (req, res) => {
  const adsPath = path.join(__dirname, '..', 'public', 'ads.txt');
  res.type('text/plain');
  fs.createReadStream(adsPath).pipe(res);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Parse endpoint - Mock implementation for testing
app.post('/api/parse', async (req, res) => {
  try {
    const { link } = req.body;

    if (!link) {
      return res.status(400).json({
        success: false,
        error: 'Link is required'
      });
    }

    if (typeof link !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Link must be a string'
      });
    }

    console.log(`Parsing link: ${link}`);
    
    // Extract surl parameter from TeraBox link or /s/{code} path
    let playUrl = link;
    let surl = null;
    try {
      const url = new URL(link);
      surl = url.searchParams.get('surl');
      if (!surl) {
        // Try to extract from /s/{code} path
        const match = url.pathname.match(/\/s\/(\w+)/);
        if (match && match[1]) {
          surl = match[1];
          // Remove leading '1' if present (as in 1TplMakwCWyNOrPxTjdNiMg)
          if (surl.startsWith('1') && surl.length > 1) {
            surl = surl.substring(1);
          }
        }
      }
      if (surl) {
        playUrl = `https://mdiskplay.com/terabox/${surl}?nid=mcen4r4yvg5dzyxf6k`;
      }
    } catch (error) {
      // fallback: use original link
    }

    // Mock response for testing - replace with actual parser later
    const result = {
      success: true,
      fileType: "video/mp4",
      directLink: link,
      playUrl,
      downloadLinks: [
        { quality: "HD", url: "https://example.com/download/hd" },
        { quality: "SD", url: "https://example.com/download/sd" }
      ]
    };
    
    return res.status(200).json(result);
  } catch (error) {
    console.error('Parse error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(`Error sending index.html for path ${req.path}:`, err);
      res.status(404).send('Frontend entrypoint not found. Check build logs.');
    }
  });
});

// Add a catch-all for other methods to provide a clear 404
app.use((req, res, next) => {
  // Serve custom 404 page for GET requests
  if (req.method === 'GET') {
    const notFoundPath = path.join(__dirname, '..', 'public', '404.html');
    if (fs.existsSync(notFoundPath)) {
      return res.status(404).sendFile(notFoundPath);
    }
  }
  res.status(404).json({
    success: false,
    error: `Route not found: Cannot ${req.method} ${req.path}`
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
