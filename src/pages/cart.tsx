import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    try {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        setCartItems(JSON.parse(cartData));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    try {
      const updatedItems = cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0);

      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = (productId: number) => {
    try {
      const updatedItems = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateSubtotal = (item: CartItem) => {
    const discountedPrice = item.price * (1 - item.discountPercentage / 100);
    return discountedPrice * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Simplified for mobile */}
      <header className="bg-white border-b border-gray-200 fixed lg:relative top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">Cart</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pt-20 lg:pt-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Cart is empty</p>
            <Link 
              href="/"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 pb-32 lg:pb-0">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border border-gray-200 p-3 rounded-xl lg:p-4 lg:flex lg:gap-4"
                >
                  {/* Mobile Layout - Simplified */}
                  <div className="lg:hidden">
                    <div className="flex gap-3">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg bg-gray-50"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-900 truncate text-sm">{item.title}</h4>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 ml-2 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            ${calculateSubtotal(item).toFixed(2)}
                          </span>
                          <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-600"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-600"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:flex lg:gap-4 lg:flex-1">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg bg-gray-50"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            ${calculateSubtotal(item).toFixed(2)}
                          </div>
                          {item.discountPercentage > 0 && (
                            <div className="text-xs text-green-600">
                              Save {item.discountPercentage}%
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Order Summary */}
            <div className="hidden lg:block">
              <div className="sticky top-4 bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout
                    </p>
                  </div>
                  <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Fixed Bottom Checkout - Simplified */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Total</span>
              <span className="text-lg font-semibold text-gray-900">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 