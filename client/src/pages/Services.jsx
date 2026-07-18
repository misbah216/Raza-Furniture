import { useState } from 'react';
import { submitBooking } from '../lib/api';

const SERVICE_TYPES = [
  'Sofa Repair',
  'Bed Repair',
  'Polishing & Refinishing',
  'Chair Repair',
  'Dining Table Repair',
  'Other',
];

const emptyForm = {
  name: '',
  phone: '',
  address: '',
  serviceType: '',
  preferredDate: '',
  description: '',
};

export default function Services() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitBooking(form);
      setStatus('sent');
      setForm(emptyForm);
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <h1 className="font-display text-3xl text-walnut mb-2">Service & Repair</h1>
      <p className="text-walnut/60 mb-10">
        Book a repair or servicing appointment for your furniture — our team will get in touch to confirm.
      </p>

      {status === 'sent' ? (
        <p className="text-pine text-sm bg-pine/10 rounded-lg p-4">
          Thank you! Your booking request has been received. We'll contact you shortly to confirm.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 bg-white/40 border border-walnut/10 rounded-xl p-6">
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/70 outline-none focus:border-brass"
          />
          <input
            required
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/70 outline-none focus:border-brass"
          />
          <input
            placeholder="Address (for home visit, if needed)"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/70 outline-none focus:border-brass"
          />
          <select
            required
            value={form.serviceType}
            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
            className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/70 outline-none focus:border-brass"
          >
            <option value="">Select service type</option>
            {SERVICE_TYPES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={form.preferredDate}
            onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
            className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/70 outline-none focus:border-brass"
          />
          <textarea
            placeholder="Describe the issue"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/70 outline-none focus:border-brass"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-walnut text-linen px-6 py-2.5 rounded-full text-sm hover:bg-pine transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? 'Booking...' : 'Book Service'}
          </button>
          {status === 'error' && (
            <p className="text-red-700 text-sm">Something went wrong, please try again.</p>
          )}
        </form>
      )}
    </div>
  );
}