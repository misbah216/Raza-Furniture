import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  getInquiries,
  getBookings,
  updateBookingStatus,
  getWork,
  createWork,
  deleteWork,
} from '../lib/api';

const emptyForm = {
  name: '',
  category: '',
  price: '',
  description: '',
  material: '',
  modelUrl: '',
  modelScale: 1,
  featured: false,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [work, setWork] = useState([]);
  const [workForm, setWorkForm] = useState({ title: '', mediaType: 'image', mediaUrl: '', description: '' });
  const [workError, setWorkError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('raza_admin_token')) {
      navigate('/admin/login');
      return;
    }
    loadAll();
  }, []);

  function loadAll() {
    getProducts().then(setProducts).catch(() => {});
    getCategories().then(setCategories).catch(() => {});
    getInquiries()
      .then(setInquiries)
      .catch((err) => {
        if (err.response?.status === 401) handleLogout();
      });
    getBookings().then(setBookings).catch(() => {});
    getWork().then(setWork).catch(() => {});
  }

  async function handleWorkSubmit(e) {
    e.preventDefault();
    setWorkError('');
    try {
      await createWork(workForm);
      setWorkForm({ title: '', mediaType: 'image', mediaUrl: '', description: '' });
      loadAll();
    } catch (err) {
      setWorkError(err.response?.data?.error || 'Something went wrong');
    }
  }

  async function handleWorkDelete(id) {
    if (!confirm('Delete this item?')) return;
    await deleteWork(id);
    loadAll();
  }

  function handleLogout() {
    localStorage.removeItem('raza_admin_token');
    navigate('/admin/login');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...form,
        price: form.price ? Number(form.price) : null,
        modelScale: form.modelScale ? Number(form.modelScale) : 1,
      };
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      loadAll();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  }

  function startEdit(p) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: p.price ?? '',
      description: p.description,
      material: p.material,
      modelUrl: p.modelUrl || '',
      modelScale: p.modelScale || 1,
      featured: p.featured,
    });
    setTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id);
    loadAll();
  }

  async function handleBookingStatus(id, status) {
    await updateBookingStatus(id, status);
    loadAll();
  }
  function whatsappLink(phone) {
    const digits = phone.replace(/\D/g, '');
    const withCode = digits.length === 10 ? `91${digits}` : digits;
    return `https://wa.me/${withCode}`;
  }


  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl text-walnut">Admin Dashboard</h1>
       <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-700 border border-red-200 bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTab('products')}
          className={`px-4 py-2 rounded-full text-sm ${
            tab === 'products' ? 'bg-walnut text-linen' : 'border border-walnut/20 text-walnut/70'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setTab('inquiries')}
          className={`px-4 py-2 rounded-full text-sm ${
            tab === 'inquiries' ? 'bg-walnut text-linen' : 'border border-walnut/20 text-walnut/70'
          }`}
        >
          Inquiries ({inquiries.length})
        </button>
        <button
          onClick={() => setTab('bookings')}
          className={`px-4 py-2 rounded-full text-sm ${
            tab === 'bookings' ? 'bg-walnut text-linen' : 'border border-walnut/20 text-walnut/70'
          }`}
        >
          Service Bookings ({bookings.length})
        </button>
         <button
          onClick={() => setTab('work')}
          className={`px-4 py-2 rounded-full text-sm ${
            tab === 'work' ? 'bg-walnut text-linen' : 'border border-walnut/20 text-walnut/70'
          }`}
        >
          Our Work ({work.length})
        </button>
      </div>

      {tab === 'products' && (
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-lg text-walnut mb-4">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 bg-white/40 border border-walnut/10 rounded-xl p-5">
              <input
                required
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-3 py-2 bg-white/70 outline-none focus:border-brass"
              />
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-3 py-2 bg-white/70 outline-none focus:border-brass"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                required
                placeholder="3D model path (e.g. /models/Couch.glb)"
                value={form.modelUrl}
                onChange={(e) => setForm({ ...form, modelUrl: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-3 py-2 bg-white/70 outline-none focus:border-brass"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Model scale (default 1, adjust if too big/small)"
                value={form.modelScale}
                onChange={(e) => setForm({ ...form, modelScale: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-3 py-2 bg-white/70 outline-none focus:border-brass"
              />
              <input
                type="number"
                placeholder="Approx starting price (₹) — optional"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-3 py-2 bg-white/70 outline-none focus:border-brass"
              />
              <input
                placeholder="Material (optional, e.g. Sheesham Wood)"
                value={form.material}
                onChange={(e) => setForm({ ...form, material: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-3 py-2 bg-white/70 outline-none focus:border-brass"
              />
              <textarea
                placeholder="Description"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-3 py-2 bg-white/70 outline-none focus:border-brass"
              />
              <label className="flex items-center gap-2 text-sm text-walnut/70">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Show on homepage as featured
              </label>

              {error && <p className="text-red-700 text-sm">{error}</p>}

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-walnut text-linen px-5 py-2 rounded-full text-sm hover:bg-pine transition-colors"
                >
                  {editingId ? 'Update' : 'Add Product'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyForm);
                    }}
                    className="px-5 py-2 rounded-full text-sm border border-walnut/20 text-walnut/70"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div>
            <h2 className="font-display text-lg text-walnut mb-4">All Products ({products.length})</h2>
            <div className="space-y-2 max-h-[38rem] overflow-y-auto pr-1">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between bg-white/40 border border-walnut/10 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-walnut">{p.name}</p>
                    <p className="text-xs text-walnut/50">
                      {p.price ? `₹${p.price.toLocaleString('en-IN')}` : 'Price on request'}
                    </p>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <button onClick={() => startEdit(p)} className="text-brass hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-700 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'inquiries' && (
        <div className="space-y-3">
          {inquiries.map((i) => (
            <div key={i.id} className="bg-white/40 border border-walnut/10 rounded-lg px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-walnut">{i.name}</p>
                <span className="text-xs text-walnut/40">
                  {new Date(i.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-sm text-walnut/60">{i.phone}</p>
              {i.message && <p className="text-sm text-walnut/70 mt-2">{i.message}</p>}
              <a
                href={whatsappLink(i.phone)}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-xs bg-[#25D366] text-white px-3 py-1.5 rounded-full hover:bg-[#1fb855] transition-colors"
              >
                Reply on WhatsApp
              </a>
            </div>
          ))}
          {inquiries.length === 0 && (
            <p className="text-walnut/50 text-sm">No inquiries yet.</p>
          )}
        </div>
      )}

      {tab === 'bookings' && (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white/40 border border-walnut/10 rounded-lg px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-walnut">
                  {b.name} — <span className="text-brass">{b.serviceType}</span>
                </p>
                <span className="text-xs text-walnut/40">
                  {new Date(b.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-sm text-walnut/60">{b.phone}</p>
              {b.address && <p className="text-sm text-walnut/60">{b.address}</p>}
              {b.preferredDate && (
                <p className="text-sm text-walnut/60">Preferred date: {b.preferredDate}</p>
              )}
              {b.description && <p className="text-sm text-walnut/70 mt-2">{b.description}</p>}
              <a
              href={whatsappLink(b.phone)}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 mb-2 text-xs bg-[#25D366] text-white px-3 py-1.5 rounded-full hover:bg-[#1fb855] transition-colors"
              >
                Reply on WhatsApp
              </a>

              <div className="flex gap-2 mt-1">
                {['pending', 'confirmed', 'completed'].map((s) => {
                  const activeStyles = {
                    pending: 'bg-amber-500 text-white border-amber-500',
                    confirmed: 'bg-blue-500 text-white border-blue-500',
                    completed: 'bg-green-600 text-white border-green-600',
                  };
                  const inactiveStyles = {
                    pending: 'border-amber-300 text-amber-700',
                    confirmed: 'border-blue-300 text-blue-700',
                    completed: 'border-green-300 text-green-700',
                  };
                  return (
                    <button
                      key={s}
                      onClick={() => handleBookingStatus(b.id, s)}
                      className={`text-xs px-3 py-1 rounded-full border capitalize transition-colors ${
                        b.status === s ? activeStyles[s] : inactiveStyles[s]
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <p className="text-walnut/50 text-sm">No service bookings yet.</p>
          )}
        </div>
      )}
      {tab === 'work' && (
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-lg text-walnut mb-4">Add Work Item</h2>
            <form onSubmit={handleWorkSubmit} className="space-y-3 bg-white/40 border border-walnut/10 rounded-xl p-5">
              <input
                required
                placeholder="Title (e.g. Custom Dining Set for Sharma Residence)"
                value={workForm.title}
                onChange={(e) => setWorkForm({ ...workForm, title: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-3 py-2 bg-white/70 outline-none focus:border-brass"
              />
              <select
                value={workForm.mediaType}
                onChange={(e) => setWorkForm({ ...workForm, mediaType: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-3 py-2 bg-white/70 outline-none focus:border-brass"
              >
                <option value="image">Photo</option>
                <option value="video">Video</option>
              </select>
              <input
                required
                placeholder="File path (e.g. /work/dining-set.jpg or .mp4)"
                value={workForm.mediaUrl}
                onChange={(e) => setWorkForm({ ...workForm, mediaUrl: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-3 py-2 bg-white/70 outline-none focus:border-brass"
              />
              <textarea
                placeholder="Description (optional)"
                rows={2}
                value={workForm.description}
                onChange={(e) => setWorkForm({ ...workForm, description: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-3 py-2 bg-white/70 outline-none focus:border-brass"
              />
              {workError && <p className="text-red-700 text-sm">{workError}</p>}
              <button
                type="submit"
                className="bg-walnut text-linen px-5 py-2 rounded-full text-sm hover:bg-pine transition-colors"
              >
                Add
              </button>
            </form>
          </div>

          <div>
            <h2 className="font-display text-lg text-walnut mb-4">All Items ({work.length})</h2>
            <div className="space-y-2 max-h-[38rem] overflow-y-auto pr-1">
              {work.map((w) => (
                <div
                  key={w.id}
                  className="flex items-center justify-between bg-white/40 border border-walnut/10 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-walnut">{w.title}</p>
                    <p className="text-xs text-walnut/50 capitalize">{w.mediaType}</p>
                  </div>
                  <button onClick={() => handleWorkDelete(w.id)} className="text-red-700 hover:underline text-xs">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}