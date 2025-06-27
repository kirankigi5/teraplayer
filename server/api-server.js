import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));

app.use(express.json());

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
    
    // Extract surl parameter from TeraBox link
    let playUrl = link;
    try {
      const url = new URL(link);
      const surl = url.searchParams.get('surl');
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

// Catch all other routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
