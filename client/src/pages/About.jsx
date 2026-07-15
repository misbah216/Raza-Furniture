export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <h1 className="font-display text-3xl text-walnut mb-2">Hamari Kahani</h1>
      <p className="text-brass text-sm uppercase tracking-wider mb-6">Est. 1997</p>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4 text-walnut/75 leading-relaxed">
          <p>
            Since 1997, Raza Furniture has been shaping wood into pieces that last. What
            started as a small workshop is today a trusted name - but our approach hasn't
            changed: quality wood, sturdy craftsmanship, and attention to detail.
          </p>
          <p>
            From sofas to beds, dining tables to home decor - every category is crafted to
            become more than just furniture, but a part of your home.
          </p>
          <p>
            We've always believed that good furniture should last generations - built with
            care, not compromise.
          </p>
        </div>

        <div>
          <div className="h-96 rounded-2xl overflow-hidden border-4 border-brass shadow-md">
            <img
              src="/work/adminimage.jpeg"
              alt="Founder of Raza Furniture"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-base font-medium text-walnut mt-10">
            Founder of Raza Furniture , Akeel Ahmad Saifi
          </p>
        </div>
      </div>
    </div>
  );
}