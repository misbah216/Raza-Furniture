import 'dotenv/config';
import mongoose from 'mongoose';
import Category from './models/Category.js';
import Product from './models/Product.js';

await mongoose.connect(process.env.MONGODB_URI);
await Category.deleteMany({});
await Product.deleteMany({});

await Category.insertMany([
  { name: 'Kitchen', shape: 'table' },
  { name: 'Bedroom', shape: 'bed' },
  { name: 'Living Area', shape: 'sofa' },
  { name: 'Others', shape: 'decor' },
]);

console.log('Categories seeded. Add products from the admin dashboard.');
await mongoose.disconnect();