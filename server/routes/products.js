import { Router } from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const { category, featured } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (featured === 'true') filter.featured = true;
  const products = await Product.find(filter).sort({ _id: -1 });
  res.json(products);
});

router.get('/categories/all', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).catch(() => null);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.post('/', requireAdmin, async (req, res) => {
  const { name, category, shape, price, description, material, woodTone, accentTone, featured, modelUrl, modelScale, modelRotationX } = req.body;
  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required' });
  }
  const product = await Product.create({
    name, category, shape: shape || 'chair',
    price: price ? Number(price) : null,
    description: description || '', material: material || '',
    woodTone: woodTone || '#8B5E3C', accentTone: accentTone || '#B08D57',
    featured: Boolean(featured), modelUrl: modelUrl || null,
    modelScale: modelScale ? Number(modelScale) : 1,
    modelRotationX: modelRotationX ? Number(modelRotationX) : 0,
    images: [],
  });
  res.status(201).json(product);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).catch(() => null);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id).catch(() => null);
  if (!deleted) return res.status(404).json({ error: 'Product not found' });
  res.json({ success: true });
});

export default router;