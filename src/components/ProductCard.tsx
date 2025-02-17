import { useState, useEffect } from 'react';
import { Product } from '../types';
import { Heart, ShoppingCart, Minus, Plus, Star } from 'lucide-react';
import ProductModal from './ProductModal';
import { cartService } from '../services/cartService';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setQuantity(cartService.getItemQuantity(product.id));
  }, [product.id]);

  const handleAddToCart = (newQuantity: number) => {
    cartService.addToCart(product, newQuantity);
    setQuantity(newQuantity);
  };

  const updateQuantity = (newQuantity: number, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (newQuantity < 0) return;
    
    cartService.updateQuantity(product.id, newQuantity);
    setQuantity(newQuantity);
  };

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  const handleCardClick = (event: React.MouseEvent) => {
    // Only open modal if not clicking on buttons or controls
    if (
      !(event.target as HTMLElement).closest('button') && 
      !(event.target as HTMLElement).closest('.quantity-controls')
    ) {
      setShowModal(true);
    }
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    const event = { stopPropagation: () => {} } as React.MouseEvent;
    updateQuantity(newQuantity, event);
  };

  return (
    <>
      <div 
        className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Product Image with Badges */}
        <div className="relative aspect-[4/3] sm:aspect-square">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.stock < 10 && (
              <span className="bg-red-100/90 backdrop-blur-sm text-red-600 px-2 py-1 text-xs rounded-full">
                Low Stock: {product.stock}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="bg-green-100/90 backdrop-blur-sm text-green-600 px-2 py-1 text-xs rounded-full">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlist(!isWishlist);
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
          >
            <Heart 
              className={`w-4 h-4 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-500">{product.brand}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">{product.title}</h3>

          {/* Price and Cart Section */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-gray-500 line-through">
                  ${product.price}
                </span>
              )}
            </div>
            <div className="quantity-controls">
              {quantity === 0 ? (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(1);
                  }}
                  className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <button 
                    onClick={(e) => updateQuantity(quantity - 1, e)}
                    className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-5 text-center text-sm">{quantity}</span>
                  <button 
                    onClick={(e) => updateQuantity(quantity + 1, e)}
                    className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddToCart={handleAddToCart}
        quantity={quantity}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </>
  );
}