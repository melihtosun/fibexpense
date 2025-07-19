import React, { useState } from 'react';
import type { Transaction } from '../types';
import CategoryFilter from './CategoryFilter';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCount, setShowCount] = useState(6);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Coffee': 'bg-amber-100 text-amber-800',
      'Transport': 'bg-blue-100 text-blue-800',
      'Shopping': 'bg-green-100 text-green-800',
      'Groceries': 'bg-green-100 text-green-800',
      'Gas': 'bg-gray-100 text-gray-800',
      'Fast Food': 'bg-red-100 text-red-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Subscriptions': 'bg-blue-100 text-blue-800',
      'Health': 'bg-teal-100 text-teal-800',
      'Education': 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Get unique categories
  const categories = [...new Set(transactions.map(t => t.category))].sort();

  // Filter transactions based on selected category
  const filteredTransactions = selectedCategory === 'All' 
    ? transactions 
    : transactions.filter(t => t.category === selectedCategory);

  // Limit the number of displayed transactions
  const displayedTransactions = filteredTransactions.slice(0, showCount);
  const hasMore = filteredTransactions.length > showCount;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-200 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">📋 Transaction History</h2>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
          {filteredTransactions.length} transactions
        </div>
      </div>
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="space-y-3">
        {displayedTransactions.map((transaction, index) => (
          <div
            key={index}
            className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:from-blue-50 hover:to-green-50 hover:border-blue-300 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300">
                  {transaction.merchant.charAt(0)}
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                  {transaction.merchant}
                </p>
                <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                  transaction.category
                )} group-hover:scale-105 transition-transform duration-300`}
              >
                {transaction.category}
              </span>
              <span className="font-bold text-gray-900 text-lg">
                ${transaction.amount.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowCount(prev => prev + 6)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Show More ({filteredTransactions.length - showCount} remaining)
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Showing {displayedTransactions.length} of {filteredTransactions.length} transactions
          </span>
          <span className="font-semibold text-gray-900">
            Total: ${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
