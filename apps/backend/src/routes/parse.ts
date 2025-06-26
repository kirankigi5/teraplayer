import { Router, Request, Response } from 'express';
import teraboxParser from '../utils/teraboxParser';

const router = Router();

interface ParseRequest {
  link: string;
}

router.post('/', async (req: Request<{}, {}, ParseRequest>, res: Response) => {
  try {
    const { link } = req.body;

    // Validate input
    if (!link) {
      return res.status(400).json({ 
        success: false, 
        error: 'Link is required.' 
      });
    }

    if (typeof link !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: 'Link must be a string.' 
      });
    }

    if (link.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Link cannot be empty.' 
      });
    }

    // Parse the link
    const result = await teraboxParser(link.trim());
    
    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    return res.json(result);
    
  } catch (error: any) {
    console.error('Error in parse route:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;
