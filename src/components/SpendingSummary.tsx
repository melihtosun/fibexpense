import React from 'react';
import type { SpendingSummary as SpendingSummaryType } from '../types';

interface SpendingSummaryProps {
  summary: SpendingSummaryType;
  aiSummary: string;
  isLoading: boolean;
}

const SpendingSummary: React.FC<SpendingSummaryProps> = ({ 
  summary, 
  aiSummary, 
  isLoading 
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-200 h-fit">
      <h2 className="text-xl font-bold text-gray-800 mb-6">📊 Spending Summary</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <p className="text-blue-100 text-sm">Total Spent</p>
          <p className="text-2xl font-bold">${summary.totalAmount.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <p className="text-green-100 text-sm">Transactions</p>
          <p className="text-2xl font-bold">{summary.transactionCount}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <p className="text-purple-100 text-sm">Top Category</p>
          <p className="text-2xl font-bold">{summary.topCategory}</p>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
          <span className="mr-2">🤖</span>
          AI Insights
        </h3>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Analyzing your spending patterns...</span>
          </div>
        ) : (
          <p className="text-gray-700 leading-relaxed">{aiSummary}</p>
        )}
      </div>
    </div>
  );
};

export default SpendingSummary;
