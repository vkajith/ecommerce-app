import { Header } from '../components/Header';
import { MobileSearch } from '../components/MobileSearch';
import { ProductGrid } from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { DEFAULT_CATEGORY } from '../constants';

export default function ProductsPage() {
  const {
    products,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    activeSection,
    setActiveSection
  } = useProducts();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const handleReset = () => {
    setSearchQuery('');
    setActiveSection(DEFAULT_CATEGORY);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        categories={categories}
        activeSection={activeSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSectionChange={setActiveSection}
      />
      <MobileSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ProductGrid
          products={products}
          onReset={handleReset}
        />
      </main>
    </div>
  );
} 