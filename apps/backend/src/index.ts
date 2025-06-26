import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import parseRoute from './routes/parse';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || (NODE_ENV === 'development' ? '*' : true),
  methods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));

// Body parsing middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Content-Type validation for POST requests
app.use((req, res, next) => {
  if (req.method === 'POST' && !req.is('application/json')) {
    return res.status(415).json({ 
      success: false, 
      error: 'Content-Type must be application/json' 
    });
  }
  return next();
});

// Routes
app.use('/api/parse', parseRoute);

// Health check endpoints
app.get('/health', (_req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: NODE_ENV,
    port: PORT
  });
});

app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});

// API info endpoint
app.get('/api', (_req, res) => {
  res.json({
    message: 'TeraPlayer Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      parse: '/api/parse'
    }
  });
});

// Initialize frontend path for production
let frontendPath = '';
if (NODE_ENV === 'production') {
  // Try multiple possible paths for deployment compatibility
  const possiblePaths = [
    path.join(__dirname, '../../frontend/dist'),
    path.join(__dirname, '../../../apps/frontend/dist'),
    path.join(process.cwd(), 'apps/frontend/dist'),
    path.join(process.cwd(), 'frontend/dist')
  ];
  
  for (const testPath of possiblePaths) {
    try {
      const fs = require('fs');
      if (fs.existsSync(testPath)) {
        frontendPath = testPath;
        break;
      }
    } catch {}
  }
  
  if (!frontendPath) {
    console.error('❌ Frontend dist folder not found! Tried paths:', possiblePaths);
    frontendPath = possiblePaths[0] || path.join(__dirname, '../../frontend/dist'); // fallback
  }
  
  console.log(`📁 Serving static files from: ${frontendPath}`);
}

// Root endpoint - defined after frontendPath is set
app.get('/', (_req, res) => {
  if (NODE_ENV === 'production' && frontendPath) {
    // In production, try to serve index.html if it exists
    const indexPath = path.join(frontendPath, 'index.html');
    const fs = require('fs');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error('Error serving index.html from root:', err);
          res.status(200).json({
            message: 'TeraPlayer - Production Deployment',
            status: 'healthy',
            version: '1.0.0',
            timestamp: new Date().toISOString()
          });
        }
      });
    } else {
      res.status(200).json({
        message: 'TeraPlayer Backend API',
        version: '1.0.0',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        frontendPath: frontendPath || 'not found',
        endpoints: {
          health: '/health',
          parse: '/api/parse'
        }
      });
    }
  } else {
    res.status(200).json({
      message: 'TeraPlayer Backend API',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        parse: '/api/parse'
      }
    });
  }
});

// Serve static files from frontend build in production
if (NODE_ENV === 'production' && frontendPath) {
  // Serve static files
  app.use(express.static(frontendPath, {
    maxAge: '1d',
    etag: true,
    lastModified: true
  }));
  
  // Handle favicon specifically
  app.get('/favicon.svg', (_req, res) => {
    res.sendFile(path.join(frontendPath, 'favicon.svg'), (err) => {
      if (err) {
        console.log('Favicon not found, checking assets folder...');
        // Try to find favicon in assets folder
        const fs = require('fs');
        const assetsPath = path.join(frontendPath, 'assets');
        try {
          const files = fs.readdirSync(assetsPath);
          const faviconFile = files.find((file: string) => file.startsWith('favicon') && file.endsWith('.svg'));
          if (faviconFile) {
            res.sendFile(path.join(assetsPath, faviconFile));
          } else {
            res.status(404).send('Favicon not found');
          }
        } catch {
          res.status(404).send('Favicon not found');
        }
      }
    });
  });
  
  // Handle React Router (return index.html for all non-API routes)
  app.get('*', (_req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(500).json({
          success: false,
          error: 'Application failed to load',
          message: 'Frontend files not found'
        });
      }
    });
  });
}

// 404 handler for development (only for non-API routes)
if (NODE_ENV === 'development') {
  app.use('*', (_req, res) => {
    res.status(404).json({
      success: false,
      error: 'Endpoint not found'
    });
  });
}

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
const port = Number(PORT);

// Ensure port is valid
if (isNaN(port) || port <= 0) {
  console.error('❌ Invalid PORT value:', PORT);
  process.exit(1);
}

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 TeraPlayer backend server running on port ${port}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${port}/health`);
  console.log(`🌐 Server listening on 0.0.0.0:${port}`);
  
  // Immediately test our own health endpoint
  setTimeout(() => {
    const http = require('http');
    const healthReq = http.request({
      hostname: 'localhost',
      port: port,
      path: '/health',
      method: 'GET'
    }, (res: any) => {
      console.log(`✅ Self health check: ${res.statusCode}`);
    });
    healthReq.on('error', (err: any) => {
      console.log(`❌ Self health check failed:`, err.message);
    });
    healthReq.end();
  }, 1000);
  
  // Log filesystem info in production for debugging
  if (NODE_ENV === 'production') {
    console.log(`📁 Working directory: ${process.cwd()}`);
    console.log(`📁 __dirname: ${__dirname}`);
    console.log(`📁 Frontend path used: ${frontendPath}`);
    try {
      const fs = require('fs');
      const exists = fs.existsSync(frontendPath);
      console.log(`📁 Frontend dist exists: ${exists}`);
      if (exists) {
        const files = fs.readdirSync(frontendPath);
        console.log(`📁 Frontend dist files:`, files);
      }
      
      // Also log what's in the current directory
      console.log(`📁 Current directory contents:`, fs.readdirSync(process.cwd()));
    } catch (err) {
      console.error('📁 Error checking frontend files:', err);
    }
  }
});

// Handle server errors
server.on('error', (err) => {
  console.error('❌ Server error:', err);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📤 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
