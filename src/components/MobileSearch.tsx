import { Search } from 'lucide-react';

interface MobileSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function MobileSearch({ searchQuery, onSearchChange }: MobileSearchProps) {
  return (
    <div className="sticky top-[94px] z-40 bg-white border-b border-gray-200 p-3 sm:hidden">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
} 