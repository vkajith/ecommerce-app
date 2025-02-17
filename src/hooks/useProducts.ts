import { useState, useEffect } from 'react';
import { Product } from '../types';
import { productService } from '../services/productService';
import { DEFAULT_CATEGORY } from '../constants';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState(DEFAULT_CATEGORY);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
        setCategories(productService.getUniqueCategories(data));
        setFilteredProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setCategories([DEFAULT_CATEGORY]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(productService.filterProducts(products, activeSection, searchQuery));
  }, [products, activeSection, searchQuery]);

  return {
    products: filteredProducts,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    activeSection,
    setActiveSection
  };
} 