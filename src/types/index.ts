export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews: Review[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  date: string;
  user: {
    name: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartAction = 
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number } };

export interface SearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface CategoryProps {
  categories: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
} 