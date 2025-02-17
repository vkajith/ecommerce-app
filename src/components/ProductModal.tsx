import { Product } from '../types';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatPrice, calculateDiscountedPrice } from '../utils/formatters';
import { ReviewList } from './ReviewList';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
  quantity: number;
  onUpdateQuantity: (newQuantity: number) => void;
}

export default function ProductModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart,
  quantity: currentQuantity,
  onUpdateQuantity 
}: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [modalQuantity, setModalQuantity] = useState(currentQuantity);

  useEffect(() => {
    setModalQuantity(currentQuantity);
  }, [currentQuantity]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0 && newQuantity <= product.stock) {
      setModalQuantity(newQuantity);
      onUpdateQuantity(newQuantity);
      onAddToCart(newQuantity);
    }
  };

  const handleGoToCart = () => {
    window.location.href = '/cart';
  };

  if (!isOpen) return null;

  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white sm:bg-gray-500/75">
      <div className="min-h-screen sm:flex sm:items-center sm:p-4">
        {/* Close button - visible only on mobile */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-md sm:hidden"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        {/* Modal Content */}
        <div className="w-full h-full sm:max-w-4xl sm:mx-auto sm:rounded-2xl bg-white overflow-hidden">
          <div className="h-full overflow-y-auto pb-24 sm:pb-0">
            {/* Mobile Header */}
            <div className="sm:hidden">
              <div className="aspect-square w-full relative">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {[product.thumbnail, ...product.images].slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          selectedImage === image ? 'border-indigo-600' : 'border-white'
                        }`}
                      >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Product Details */}
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h2>
                <p className="text-gray-500 mb-4">{product.description}</p>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(discountedPrice)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-green-600">
                        Save {product.discountPercentage}%
                      </span>
                    </>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Brand:</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Stock:</span>
                    <span className="font-medium">{product.stock} units</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">{product.rating} / 5</span>
                  </div>
                </div>

                {/* Mobile Quantity Controls */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(modalQuantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                        disabled={modalQuantity === 0}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{modalQuantity}</span>
                      <button
                        onClick={() => handleQuantityChange(modalQuantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                        disabled={modalQuantity >= product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block p-6">
              <div className="sm:grid sm:grid-cols-2 sm:gap-8">
                <div>
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={selectedImage}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[product.thumbnail, ...product.images].slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 ${
                          selectedImage === image ? 'border-indigo-600' : 'border-transparent'
                        }`}
                      >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{product.title}</h2>
                  <p className="text-gray-500 mb-4">{product.description}</p>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(discountedPrice)}
                    </span>
                    {product.discountPercentage > 0 && (
                      <>
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-green-600">
                          Save {product.discountPercentage}%
                        </span>
                      </>
                    )}
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Brand:</span>
                      <span className="font-medium">{product.brand}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Stock:</span>
                      <span className="font-medium">{product.stock} units</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium">{product.rating} / 5</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(modalQuantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                          disabled={modalQuantity === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{modalQuantity}</span>
                        <button
                          onClick={() => handleQuantityChange(modalQuantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                          disabled={modalQuantity >= product.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="px-4 sm:px-6 mt-8 pt-8 border-t border-gray-200">
              <ReviewList reviews={product.reviews} />
            </div>
          </div>

          {/* Fixed Bottom Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:static sm:border-0 sm:p-0 sm:mt-4">
            <button
              onClick={handleGoToCart}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 