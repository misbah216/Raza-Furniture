import { Router } from 'express';
import Booking from '../models/Booking.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, phone, address, serviceType, preferredDate, description } = req.body;
  if (!name || !phone || !serviceType) {
    return res.status(400).json({ error: 'Name, phone and service type are required' });
  }
  const booking = await Booking.create({ name, phone, address: address || '', serviceType, preferredDate: preferredDate || '', description: description || '' });
  res.status(201).json({ success: true, id: booking._id });
});

router.get('/', requireAdmin, async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).catch(() => null);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  res.json(booking);
});

export default router;
