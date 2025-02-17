import Link from 'next/link';
import { Search, ShoppingBag, ShoppingCart } from 'lucide-react';
import { formatCategoryName } from '../utils/formatters';
import { CartCount } from './CartCount';

interface HeaderProps {
  categories: string[];
  activeSection: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSectionChange: (section: string) => void;
}

export function Header({ 
  categories, 
  activeSection, 
  searchQuery, 
  onSearchChange, 
  onSectionChange 
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">MarketPlace</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative max-w-xs w-full hidden sm:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart className="w-6 h-6" />
              <CartCount />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onSectionChange(category)}
                className={`text-sm font-medium whitespace-nowrap ${
                  activeSection === category
                    ? 'text-indigo-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {category === 'All' ? category : formatCategoryName(category)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
} 