import { useEffect, useState } from 'react';
import { getWork } from '../lib/api';

export default function OurWork() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getWork().then(setItems).catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 py-16">
      <h1 className="font-display text-3xl text-walnut mb-2">Our Work</h1>
      <p className="text-walnut/60 mb-10">
        A glimpse of the craftsmanship we've delivered over the years.
      </p>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group bg-white/70 border-4 border-brass shadow-md rounded-2xl overflow-hidden hover:border-walnut hover:shadow-xl hover:-translate-y-1 transition-all duration-300 break-inside-avoid"
          >
            <div className="bg-brassLight/10">
              {item.mediaType === 'video' ? (
                <video
                  src={item.mediaUrl}
                  className="w-full h-auto"
                  controls
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img src={item.mediaUrl} alt={item.title} className="w-full h-auto block" />
              )}
            </div>
           <div className="p-4 border-t-2 border-brass/20">
              <h3 className="font-display text-lg text-walnut group-hover:text-brass transition-colors">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-walnut/60 mt-1">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-walnut/50 text-sm">No work added yet — check back soon.</p>
      )}
    </div>
  );
}