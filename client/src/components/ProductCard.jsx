import { Link } from 'react-router-dom';
import Scene3D from './Scene3D';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-white/70 border border-walnut/25 shadow-sm rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-walnut/10 hover:border-brass transition-all hover:-translate-y-1"
    >
      <div className="h-56 bg-gradient-to-b from-brassLight/20 to-transparent">
        <Scene3D
          shape={product.shape}
          woodTone={product.woodTone}
          accentTone={product.accentTone}
          modelUrl={product.modelUrl}
          modelScale={product.modelScale}
          className="w-full h-full"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-walnut">{product.name}</h3>
        <p className="text-sm text-walnut/60 mt-1">{product.material}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-brass font-semibold">
            {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Price on request'}
          </span>
          <span className="text-xs text-walnut/50 group-hover:text-brass transition-colors">
            360° View →
          </span>
        </div>
      </div>
    </Link>
  );
}