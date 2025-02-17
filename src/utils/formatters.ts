export const formatCategoryName = (category: string): string => {
  if (!category || typeof category !== 'string') return '';
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const calculateDiscountedPrice = (price: number, discountPercentage: number): number => {
  return price * (1 - discountPercentage / 100);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}; 