import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'All': '📊',
      'Coffee': '☕',
      'Transport': '🚗',
      'Shopping': '🛍️',
      'Groceries': '🛒',
      'Gas': '⛽',
      'Fast Food': '🍔',
      'Entertainment': '🎬',
      'Subscriptions': '📱',
      'Health': '🏥',
      'Education': '📚',
    };
    return icons[category] || '💳';
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Filter by Category</h3>
      <div className="flex flex-wrap gap-3">
        {['All', ...categories].map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`group inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300'
            }`}
          >
            <span className="mr-2 text-base group-hover:scale-110 transition-transform duration-300">
              {getCategoryIcon(category)}
            </span>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
