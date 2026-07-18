import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, default: null },
  description: { type: String, default: '' },
  material: { type: String, default: '' },
  modelUrl: { type: String, default: null },
  modelScale: { type: Number, default: 1 },
  modelRotationX: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  shape: { type: String, default: 'chair' },
  woodTone: { type: String, default: '#8B5E3C' },
  accentTone: { type: String, default: '#B08D57' },
  images: { type: [String], default: [] },
});

productSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('Product', productSchema);