export default function Footer() {
  return (
   <footer className="bg-walnutDeep text-linen/90">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl mb-3">Raza Furniture</h3>
         <p className="text-sm text-linen/60 leading-relaxed">
            Furniture and home decor for every space - handcrafted with care since 1997.
          </p>
        </div>
        <div>
          <h4 className="text-brassLight text-sm uppercase tracking-wider mb-3">Contact</h4>
         <ul className="text-sm space-y-2 text-linen/70">
            <li>Phone: +91 9927418320</li>
            <li>Email: akilahamad350@gmail.com</li>
              <li>
                <a
                  href="https://www.google.com/maps?q=28.9177986,79.5167192"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brassLight transition-colors"
                >
                  Badi nahar, uttranchal colony road bandia, kichha, uttrakhand 263148
                </a>
              </li>
              <li>
              <a
                href="https://www.instagram.com/akeel_saifi_331?igsh=NWU3cnM0amNmYXdj"
                target="_blank"
                rel="noreferrer"
                className="text-brassLight hover:underline inline-flex items-center gap-1.5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16m0-2.16C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.92.56a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .61 4.15c-.3.77-.5 1.64-.56 2.92C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.92.3.79.71 1.46 1.39 2.13.67.67 1.34 1.09 2.13 1.39.77.3 1.64.5 2.92.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.92-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.3-.77.5-1.64.56-2.92.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.92a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.87.63c-.77-.3-1.64-.5-2.92-.56C15.67.01 15.26 0 12 0m0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84m0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4m6.4-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44"/>
                </svg>
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-brassLight text-sm uppercase tracking-wider mb-3">Hours</h4>
          <ul className="text-sm space-y-2 text-linen/70">
            <li> 9:00 AM – 7:00 PM : Open</li>
            <li>Friday: Closed</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-linen/10 text-center text-xs text-linen/50 py-4">
        © {new Date().getFullYear()} Raza Furniture. All rights reserved.
      </div>
    </footer>
  );
}
