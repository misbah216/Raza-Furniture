import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public: submit an inquiry (contact form / product inquiry)
router.post('/', async (req, res) => {
  await db.read();
  const { name, phone, message, productId } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required' });
  }

  const inquiry = {
    id: nanoid(8),
    name,
    phone,
    message: message || '',
    productId: productId || null,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  db.data.inquiries.push(inquiry);
  await db.write();
  res.status(201).json({ success: true });
});

// Admin: view all inquiries
router.get('/', requireAdmin, async (req, res) => {
  await db.read();
  const sorted = [...db.data.inquiries].reverse();
  res.json(sorted);
});

// Admin: mark inquiry as read/contacted
router.put('/:id', requireAdmin, async (req, res) => {
  await db.read();
  const idx = db.data.inquiries.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Inquiry not found' });

  db.data.inquiries[idx].status = req.body.status || db.data.inquiries[idx].status;
  await db.write();
  res.json(db.data.inquiries[idx]);
});

export default router;
