import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public: view all work items
router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data.work);
});

// Admin: add a new work item
router.post('/', requireAdmin, async (req, res) => {
  await db.read();
  const { title, mediaType, mediaUrl, description } = req.body;

  if (!title || !mediaUrl) {
    return res.status(400).json({ error: 'Title and media path are required' });
  }

  const item = {
    id: nanoid(8),
    title,
    mediaType: mediaType === 'video' ? 'video' : 'image',
    mediaUrl,
    description: description || '',
    createdAt: new Date().toISOString(),
  };

  db.data.work.push(item);
  await db.write();
  res.status(201).json(item);
});

// Admin: delete a work item
router.delete('/:id', requireAdmin, async (req, res) => {
  await db.read();
  const before = db.data.work.length;
  db.data.work = db.data.work.filter((w) => w.id !== req.params.id);
  if (db.data.work.length === before) {
    return res.status(404).json({ error: 'Item not found' });
  }
  await db.write();
  res.json({ success: true });
});

export default router;