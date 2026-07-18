import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Scene3D from '../components/Scene3D';
import { getProduct, submitInquiry } from '../lib/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    getProduct(id).then(setProduct).catch(() => setProduct(false));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitInquiry({ ...form, productId: id });
      setStatus('sent');
      setForm({ name: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  if (product === false) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-20 text-center">
        <p className="text-walnut/60">Product not found.</p>
        <Link to="/products" className="text-brass hover:underline text-sm">
          ← Back to products
        </Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-2 gap-10">
      <div>
        <div className="h-96 md:h-[28rem] bg-gradient-to-b from-brassLight/15 to-transparent rounded-2xl wood-grain-texture">
          <Scene3D
            shape={product.shape}
            woodTone={product.woodTone}
            accentTone={product.accentTone}
            modelUrl={product.modelUrl}
            modelScale={product.modelScale}
            allowDrag
            className="w-full h-full"
          />
        </div>
        <p className="text-center text-xs text-walnut/40 mt-3">
          Click &amp; drag to rotate • Scroll to zoom
        </p>
      </div>

      <div>
        <Link to="/products" className="text-xs text-walnut/50 hover:text-brass">
          ← Back to products
        </Link>
        <h1 className="font-display text-3xl text-walnut mt-3">{product.name}</h1>
       <p className="text-brass text-2xl font-semibold mt-2">
          {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Price on request , contact us'}
        </p>
        <p className="text-walnut/70 mt-4 leading-relaxed">{product.description}</p>
        <p className="text-sm text-walnut/50 mt-3">
          <span className="font-medium text-walnut/70">Material:</span> {product.material}
        </p>

        <div className="mt-8 border-t border-walnut/10 pt-8">
          <h2 className="font-display text-lg text-walnut mb-4">Ask about this product</h2>
          {status === 'sent' ? (
            <p className="text-pine text-sm bg-pine/10 rounded-lg p-4">
              Thank you! We will contact you shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/50 text-walnut placeholder:text-walnut/40 focus:border-brass outline-none"
              />
              <input
                required
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/50 text-walnut placeholder:text-walnut/40 focus:border-brass outline-none"
              />
              <textarea
                placeholder="Message (optional)"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/50 text-walnut placeholder:text-walnut/40 focus:border-brass outline-none"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-walnut text-linen px-6 py-2.5 rounded-full text-sm hover:bg-pine transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
              </button>
              {status === 'error' && (
                <p className="text-red-700 text-sm">Something went wrong, please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
