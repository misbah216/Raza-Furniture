import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { WhatsAppIcon, InstagramIcon } from './Icons';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/services', label: 'Service & Repair' },
  { to: '/about', label: 'About' },

  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('raza_admin_token'));
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-walnut/95 backdrop-blur border-b border-black/20">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-linen flex items-center">
    <img src="/logo.png" alt="Raza Furniture Logo" className="h-12 w-auto object-contain" />
</Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive ? 'text-brassLight font-medium' : 'text-linen/75 hover:text-linen'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-brassLight font-medium': 'text-linen/75 hover:text-linen'
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          <a
            href="https://www.instagram.com/akeel_saifi_331?igsh=NWU3cnM0amNmYXdj"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-linen/75 hover:text-brassLight transition-colors"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/919927418320"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#1fb855] transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            WhatsApp Us
          </a>
        </nav>

        <button
          className="md:hidden text-linen"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 7h16M4 12h16M4 17h16'}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-1 px-5 pb-4 border-t border-black/20 bg-walnut">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2 text-linen/90"
            >
              {l.label}
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              onClick={() => setOpen(false)}
              className="py-2 text-brassLight font-medium"
            >
              Dashboard
            </NavLink>
          )}

          <a
            href="https://www.instagram.com/akeel_saifi_331?igsh=NWU3cnM0amNmYXdj"
            target="_blank"
            rel="noreferrer"
            className="py-2 text-linen/90 flex items-center gap-2"
          >
            <InstagramIcon className="w-4 h-4" /> Instagram
          </a>
        </nav>
      )}
    </header>
  );
}