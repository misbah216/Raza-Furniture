import { Router } from 'express';
import Work from '../models/Work.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const work = await Work.find().sort({ createdAt: -1 });
  res.json(work);
});

router.post('/', requireAdmin, async (req, res) => {
  const { title, mediaType, mediaUrl, description } = req.body;
  if (!title || !mediaUrl) {
    return res.status(400).json({ error: 'Title and media path are required' });
  }
  const item = await Work.create({ title, mediaType: mediaType === 'video' ? 'video' : 'image', mediaUrl, description: description || '' });
  res.status(201).json(item);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  const deleted = await Work.findByIdAndDelete(req.params.id).catch(() => null);
  if (!deleted) return res.status(404).json({ error: 'Item not found' });
  res.json({ success: true });
});

export default router;