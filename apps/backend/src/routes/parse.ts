import { Router } from 'express';
import teraboxParser from '../utils/teraboxParser';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { link } = req.body;
    if (!link || typeof link !== 'string') {
      return res.status(400).json({ success: false, error: 'No link provided.' });
    }
    const result = await teraboxParser(link);
    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: 'Internal server error.',
      details: err.message || err.toString(),
    });
  }
});

export default router;
