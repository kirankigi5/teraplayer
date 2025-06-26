import { VercelRequest, VercelResponse } from '@vercel/node';
import cors from 'cors';
import teraboxParser from '../utils/teraboxParser';

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

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

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
    const result = await teraboxParser(link);
    
    return res.status(200).json(result);
  } catch (error) {
    console.error('Parse error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
