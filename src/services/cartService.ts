import { Product, CartItem } from '../types';

export const cartService = {
  getCart(): CartItem[] {
    try {
      const cartData = localStorage.getItem('cart');
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  },

  addToCart(product: Product, quantity: number): void {
    try {
      const cart = this.getCart();
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        cart.push({ ...product, quantity });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  },

  updateQuantity(productId: number, quantity: number): void {
    try {
      const cart = this.getCart();
      
      if (quantity === 0) {
        const updatedCart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
          existingItem.quantity = quantity;
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  },

  getItemQuantity(productId: number): number {
    try {
      const cart = this.getCart();
      const item = cart.find(item => item.id === productId);
      return item?.quantity || 0;
    } catch (error) {
      console.error('Error getting item quantity:', error);
      return 0;
    }
  }
}; 