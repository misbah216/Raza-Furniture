import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public: customer submits a repair/service booking
router.post('/', async (req, res) => {
  await db.read();
  const { name, phone, address, serviceType, preferredDate, description } = req.body;

  if (!name || !phone || !serviceType) {
    return res.status(400).json({ error: 'Name, phone and service type are required' });
  }

  const booking = {
    id: nanoid(8),
    name,
    phone,
    address: address || '',
    serviceType,
    preferredDate: preferredDate || '',
    description: description || '',
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  db.data.bookings.push(booking);
  await db.write();
  res.status(201).json({ success: true });
});

// Admin: view all bookings
router.get('/', requireAdmin, async (req, res) => {
  await db.read();
  const sorted = [...db.data.bookings].reverse();
  res.json(sorted);
});

// Admin: update booking status (pending / confirmed / completed)
router.put('/:id', requireAdmin, async (req, res) => {
  await db.read();
  const idx = db.data.bookings.findIndex((b) => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Booking not found' });

  db.data.bookings[idx].status = req.body.status || db.data.bookings[idx].status;
  await db.write();
  res.json(db.data.bookings[idx]);
});

export default router;