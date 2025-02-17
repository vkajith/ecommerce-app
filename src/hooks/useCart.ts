import { useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { Product } from '../types';

export const useCart = (product: Product) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(cartService.getItemQuantity(product.id));
  }, [product.id]);

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 0) {
      cartService.updateQuantity(product.id, newQuantity);
      setQuantity(newQuantity);
    }
  };

  const addToCart = (quantity: number) => {
    cartService.addToCart(product, quantity);
    setQuantity(quantity);
  };

  return { quantity, updateQuantity, addToCart };
}; 