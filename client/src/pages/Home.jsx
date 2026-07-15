import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGLTF } from '@react-three/drei';
import Scene3D from '../components/Scene3D';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../lib/api';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    getProducts({ featured: 'true' })
      .then((data) => {
        setFeatured(data);
        setLoadingFeatured(false);
      })
      .catch(() => setLoadingFeatured(false));
    getCategories().then(setCategories).catch(() => {});
  }, []);

  // Cycle the hero 3D model through products that have a real model uploaded
 // Cycle the hero 3D model through products that have a real model uploaded
  const heroModels = featured.filter((p) => p.modelUrl);

  // Preload every hero model up front so switching between them is instant,
  // instead of each one re-fetching/parsing when it becomes active.
  useEffect(() => {
    heroModels.forEach((p) => {
      useGLTF.preload(p.modelUrl);
    });
  }, [featured]);

  useEffect(() => {
    if (heroModels.length < 2) return;
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroModels.length);
    }, 6000); // change model every 6 seconds
    return () => clearInterval(timer);
  }, [heroModels.length]);

  const currentHeroModel = heroModels[heroIndex];
  return (
    <div>
      {/* HERO — signature 3D element */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-8 items-center pt-14 pb-8 md:pt-24 md:pb-16">
          <div>
           <p className="uppercase tracking-[0.2em] text-xs text-brass font-medium mb-4">
              Handcrafted Since 1997
            </p>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1] text-walnut">
             Furniture that becomes <span className="italic text-wood">part of your home</span>
            </h1>
            <p className="mt-5 text-walnut/70 text-lg max-w-md">
             At Raza Furniture, every piece is handcrafted - sofas, beds, dining tables ,home decor and every furniture you want . Explore it in 3D and see it come to life.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/products"
                className="bg-walnut text-linen px-6 py-3 rounded-full text-sm hover:bg-pine transition-colors"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="border border-walnut/30 text-walnut px-6 py-3 rounded-full text-sm hover:border-walnut transition-colors"
              >
                Visit Our Shop
              </Link>
            </div>
          </div>

          <div className="h-80 md:h-[26rem] relative">
            <div className="absolute inset-0 bg-brassLight/10 rounded-[2rem] wood-grain-texture" />
           {loadingFeatured ? (
              <div className="w-full h-full flex items-center justify-center text-walnut/40 text-sm">
                Loading...
              </div>
            ) : currentHeroModel ? (
              <Scene3D
                key={currentHeroModel.id}
                modelUrl={currentHeroModel.modelUrl}
                modelScale={currentHeroModel.modelScale}
                modelRotationX={currentHeroModel.modelRotationX}
                className="relative w-full h-full hero-fade"
              />
            ) : (
              <Scene3D shape="sofa" woodTone="#8B5E3C" accentTone="#C9A66B" className="relative w-full h-full" />
            )}
            <p className="text-center text-base font-medium text-walnut mt-2 absolute -bottom-8 w-full">
              {currentHeroModel ? currentHeroModel.name : 'Explore each product in 3D'}
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="font-display text-2xl text-walnut mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((c) => (
           <Link
              key={c.id}
              to={`/products?category=${c.id}`}
              className="bg-white border border-walnut/20 shadow-sm rounded-xl p-5 text-center hover:border-brass hover:shadow-md transition-all"
            >
              <span className="text-sm font-medium text-walnut">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl text-walnut">Featured Pieces</h2>
          <Link to="/products" className="text-sm text-brass hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {featured.length === 0 && (
          <p className="text-walnut/50 text-sm">
            Products are loading - please check that the server is running.
          </p>
        )}
      </section>

      {/* STORY STRIP */}
      <section className="bg-walnut text-linen py-16 wood-grain-texture">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="font-display text-2xl md:text-3xl mb-4">
            A Promise Since 1997
          </h2>
          <p className="text-linen/70 max-w-2xl mx-auto italic">
            "Since 1997, every piece we build has carried the same promise . honest
            craftsmanship, made to last a lifetime."
          </p>
        </div>
      </section>
    </div>
  );
}
