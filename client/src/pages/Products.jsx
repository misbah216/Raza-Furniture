import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../lib/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    const params = activeCategory ? { category: activeCategory } : {};
    getProducts(params).then(setProducts).catch(() => {});
  }, [activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <h1 className="font-display text-3xl text-walnut mb-2">Our Collection</h1>
      <p className="text-walnut/60 mb-8">Drag any piece to explore it in 360°.</p>

      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSearchParams({})}
          className={`px-4 py-2 rounded-full text-sm border transition-colors ${
            !activeCategory
              ? 'bg-walnut text-linen border-walnut'
              : 'border-walnut/20 text-walnut/70 hover:border-walnut/50'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSearchParams({ category: c.id })}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              activeCategory === c.id
                ? 'bg-walnut text-linen border-walnut'
                : 'border-walnut/20 text-walnut/70 hover:border-walnut/50'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-walnut/50 text-sm mt-8">No products in this category yet.</p>
      )}
    </div>
  );
}
