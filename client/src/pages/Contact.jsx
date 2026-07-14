import { useState } from 'react';
import { submitInquiry } from '../lib/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitInquiry(form);
      setStatus('sent');
      setForm({ name: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <h1 className="font-display text-3xl text-walnut mb-2">Contact Us</h1>
      <p className="text-walnut/60 mb-10">
        If you have any questions, feel free to reach out to us via WhatsApp or fill out the form below.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4 text-sm text-walnut/70">
          <div>
            <p className="text-walnut font-medium">Phone</p>
            <p>+91 9927418320</p>
          </div>
          <div>
            <p className="text-walnut font-medium">Email</p>
            <p>akilahamad350@gmail.com</p>
          </div>
          <div>
            <p className="text-walnut font-medium">Shop Address</p>
            <p>Badi nahar , uttranchal colony road bandia , kichha , uttrakhand 263148</p>
          </div>
          <a
         href="https://wa.me/919927418320"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-[#25D366] text-white hover:bg-[#1fb855] transition-colors px-5 py-2.5 rounded-full text-sm"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2m0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.7 8.24-8.25 8.24m4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.24-.86.85-.86 2.07s.89 2.4 1.01 2.56c.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29"/>
            </svg>
            WhatsApp Us
          </a>
          <div className="mt-6 rounded-xl overflow-hidden border-2 border-brass shadow-md">
            <iframe
              title="Raza Furniture Location"
              src="https://www.google.com/maps?q=Badi+nahar+uttranchal+colony+road+bandia+kichha+uttrakhand+263148&output=embed"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div>
          {status === 'sent' ? (
            <p className="text-pine text-sm bg-pine/10 rounded-lg p-4">
              Thank you! We'll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/50 focus:border-brass outline-none"
              />
              <input
                required
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/50 focus:border-brass outline-none"
              />
              <textarea
                placeholder="Your message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/50 focus:border-brass outline-none"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-walnut text-linen px-6 py-2.5 rounded-full text-sm hover:bg-pine transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
