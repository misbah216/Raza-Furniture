import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

// Admin credentials come from environment variables (.env), not the database,
// so there's no separate signup flow — only one admin account (the shop owner).
let cachedHash = null;

async function getAdminPasswordHash() {
  if (!cachedHash) {
    cachedHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  }
  return cachedHash;
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const hash = await getAdminPasswordHash();
  const valid = await bcrypt.compare(password, hash);

  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, email });
});

export default router;
