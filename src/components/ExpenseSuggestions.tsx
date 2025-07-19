import React from 'react';
import type { Transaction } from '../types';

interface ExpenseSuggestionsProps {
  transactions: Transaction[];
}

interface Suggestion {
  icon: string;
  title: string;
  description: string;
  savingsAmount: number;
  category: string;
  type: 'warning' | 'tip' | 'info';
}

const ExpenseSuggestions: React.FC<ExpenseSuggestionsProps> = ({ transactions }) => {
  const generateSuggestions = (): Suggestion[] => {
    const categoryTotals = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    const suggestions: Suggestion[] = [];

    // Coffee spending suggestion
    const coffeeSpending = categoryTotals['Coffee'] || 0;
    if (coffeeSpending > 40) {
      suggestions.push({
        icon: '☕',
        title: 'Coffee Savings Opportunity',
        description: `We detected you spent $${coffeeSpending.toFixed(2)} on coffee this period. You could save up to $${(coffeeSpending * 0.4).toFixed(2)} with our partner coffee shop discounts!`,
        savingsAmount: coffeeSpending * 0.4,
        category: 'Coffee',
        type: 'tip',
      });
    }

    // Transport suggestion
    const transportSpending = categoryTotals['Transport'] || 0;
    if (transportSpending > 80) {
      suggestions.push({
        icon: '🚗',
        title: 'Transportation Optimization',
        description: `Your transport costs are $${transportSpending.toFixed(2)}. Consider our cashback credit card for 3% back on rideshares and gas stations.`,
        savingsAmount: transportSpending * 0.03,
        category: 'Transport',
        type: 'info',
      });
    }

    // Shopping suggestion
    const shoppingSpending = categoryTotals['Shopping'] || 0;
    if (shoppingSpending > 200) {
      suggestions.push({
        icon: '🛍️',
        title: 'Smart Shopping Alert',
        description: `High shopping activity detected ($${shoppingSpending.toFixed(2)}). Enable spending alerts to stay within budget and earn 2x points on purchases.`,
        savingsAmount: 25,
        category: 'Shopping',
        type: 'warning',
      });
    }

    // Subscription optimization
    const subscriptionSpending = categoryTotals['Subscriptions'] || 0;
    const entertainmentSpending = categoryTotals['Entertainment'] || 0;
    if (subscriptionSpending + entertainmentSpending > 50) {
      suggestions.push({
        icon: '📱',
        title: 'Subscription Bundle Deal',
        description: `You're spending $${(subscriptionSpending + entertainmentSpending).toFixed(2)} on entertainment. Our premium bundle could save you money!`,
        savingsAmount: 15,
        category: 'Entertainment',
        type: 'tip',
      });
    }

    return suggestions.slice(0, 3); // Limit to 3 suggestions
  };

  const suggestions = generateSuggestions();

  const getTypeColor = (type: 'warning' | 'tip' | 'info') => {
    switch (type) {
      case 'warning':
        return 'from-orange-50 to-red-50 border-orange-200';
      case 'tip':
        return 'from-green-50 to-emerald-50 border-green-200';
      case 'info':
        return 'from-blue-50 to-green-50 border-blue-200';
    }
  };

  const getIconColor = (type: 'warning' | 'tip' | 'info') => {
    switch (type) {
      case 'warning':
        return 'text-orange-600 bg-orange-100';
      case 'tip':
        return 'text-green-600 bg-green-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
    }
  };

  if (suggestions.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Great Job!</h3>
          <p className="text-gray-600 text-sm">Your spending looks healthy. Keep it up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-200 h-fit">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">💡 Smart Suggestions</h2>
          <p className="text-gray-600 text-sm">AI recommendations to optimize spending</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
          Save ${Math.round(suggestions.reduce((sum, s) => sum + s.savingsAmount, 0))}
        </span>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-r ${getTypeColor(suggestion.type)} rounded-xl p-4 border hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(suggestion.type)}`}>
                <span className="text-lg">{suggestion.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{suggestion.title}</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{suggestion.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{suggestion.category}</span>
                  <button className="px-3 py-1 bg-white/80 hover:bg-white text-gray-700 rounded-lg text-xs font-medium transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseSuggestions;
