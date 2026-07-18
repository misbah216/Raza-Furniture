import { Router } from 'express';
import Inquiry from '../models/Inquiry.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, phone, message, productId } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required' });
  }
  const inquiry = await Inquiry.create({ name, phone, message: message || '', productId: productId || null });
  res.status(201).json({ success: true, id: inquiry._id });
});

router.get('/', requireAdmin, async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json(inquiries);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).catch(() => null);
  if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });
  res.json(inquiry);
});

export default router;