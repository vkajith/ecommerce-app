import { Product } from '../types';
import { API_BASE_URL, PRODUCTS_LIMIT } from '../constants';
import { Review } from '../types';

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products?limit=${PRODUCTS_LIMIT}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data.products;
  },

  getUniqueCategories(products: Product[]): string[] {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return ['All', ...uniqueCategories];
  },

  filterProducts(products: Product[], category: string, searchQuery: string): Product[] {
    return products.filter(product => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = !searchQuery || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  },

  async getProductReviews(productId: number): Promise<Review[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      return data.reviews;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }
}; 