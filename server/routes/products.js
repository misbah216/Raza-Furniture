import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public: list all products (optionally filter by category)
router.get('/', async (req, res) => {
  await db.read();
  const { category, featured } = req.query;
  let products = db.data.products;

  if (category) products = products.filter((p) => p.category === category);
  if (featured === 'true') products = products.filter((p) => p.featured);

  res.json(products);
});

// Public: list categories
router.get('/categories/all', async (req, res) => {
  await db.read();
  res.json(db.data.categories);
});

// Public: get single product
router.get('/:id', async (req, res) => {
  await db.read();
  const product = db.data.products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Admin: create product
router.post('/', requireAdmin, async (req, res) => {
  await db.read();
  const {
    name,
    category,
    shape,
    price,
    description,
    material,
    woodTone,
    accentTone,
    featured,
  } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required' });
  }

  const product = {
    id: nanoid(8),
    name,
    category,
    shape: shape || 'chair',
   price: price ? Number(price) : null,
    description: description || '',
    material: material || '',
    woodTone: woodTone || '#8B5E3C',
    accentTone: accentTone || '#B08D57',
    featured: Boolean(featured),
    images: [],
  };

  db.data.products.push(product);
  await db.write();
  res.status(201).json(product);
});

// Admin: update product
router.put('/:id', requireAdmin, async (req, res) => {
  await db.read();
  const idx = db.data.products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });

  db.data.products[idx] = { ...db.data.products[idx], ...req.body, id: req.params.id };
  await db.write();
  res.json(db.data.products[idx]);
});

// Admin: delete product
router.delete('/:id', requireAdmin, async (req, res) => {
  await db.read();
  const before = db.data.products.length;
  db.data.products = db.data.products.filter((p) => p.id !== req.params.id);
  if (db.data.products.length === before) {
    return res.status(404).json({ error: 'Product not found' });
  }
  await db.write();
  res.json({ success: true });
});

export default router;
