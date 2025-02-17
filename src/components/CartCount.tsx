import { useEffect, useState } from 'react';
import { cartService } from '../services/cartService';

export function CartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const cart = cartService.getCart();
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    setCount(itemCount);
  }, []);

  if (count === 0) return null;

  return (
    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
      <span className="text-xs text-white font-medium">{count}</span>
    </div>
  );
} 