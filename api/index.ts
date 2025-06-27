import { VercelRequest, VercelResponse } from '@vercel/node';
import cors from 'cors';

// Initialize CORS
const corsHandler = cors({
  origin: true,
  methods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
});

// Promisify CORS
function runCors(req: VercelRequest, res: VercelResponse) {
  return new Promise((resolve, reject) => {
    corsHandler(req as any, res as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  await runCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      message: 'TeraDownloaderPlayer API is running',
      timestamp: new Date().toISOString()
    });
  }

  return res.status(405).json({ 
    success: false, 
    error: 'Method not allowed' 
  });
}
