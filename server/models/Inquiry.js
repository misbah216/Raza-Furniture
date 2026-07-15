import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, default: '' },
  productId: { type: String, default: null },
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

inquirySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('Inquiry', inquirySchema);