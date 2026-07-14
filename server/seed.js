import { db, initDb } from './db.js';
import { nanoid } from 'nanoid';

await initDb();
db.data.categories = [
  { id: nanoid(8), name: 'Kitchen', shape: 'table' },
  { id: nanoid(8), name: 'Bedroom', shape: 'bed' },
  { id: nanoid(8), name: 'Living Area', shape: 'sofa' },
  { id: nanoid(8), name: 'Others', shape: 'decor' },
];


const cat = (name) => db.data.categories.find((c) => c.name === name).id;

db.data.products = [];

await db.write();
console.log('Database seeded with', db.data.products.length, 'products');
