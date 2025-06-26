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
  origin: process.env.FRONTEND_ORIGIN || (NODE_ENV === 'development' ? '*' : false),
  methods: ['GET', 'POST'],
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

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
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

// Serve static files from frontend build in production
if (NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(frontendPath));
  
  // Handle React Router (return index.html for all non-API routes)
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  // Root endpoint for development
  app.get('/', (_req, res) => {
    res.json({
      message: 'TeraPlayer Backend API',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        parse: '/api/parse'
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
app.listen(PORT, () => {
  console.log(`🚀 TeraPlayer backend server running on port ${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
