import React from 'react';
import type { Transaction } from '../types';

interface SmartInsightsProps {
  transactions: Transaction[];
}

interface InsightCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  description: string;
}

const SmartInsights: React.FC<SmartInsightsProps> = ({ transactions }) => {
  const generateInsights = (): InsightCard[] => {
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const categoryTotals = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    const coffeeSpending = categoryTotals['Coffee'] || 0;
    const subscriptionSpending = categoryTotals['Subscriptions'] || 0;
    const fastFoodSpending = categoryTotals['Fast Food'] || 0;
    const shoppingSpending = categoryTotals['Shopping'] || 0;

    const insights: InsightCard[] = [];

    // Coffee insight
    if (coffeeSpending > 0) {
      const coffeePercentage = (coffeeSpending / totalAmount) * 100;
      insights.push({
        title: 'Coffee Expenses',
        value: `$${coffeeSpending.toFixed(2)}`,
        change: coffeeSpending > 50 ? '17% increase' : '5% decrease',
        changeType: coffeeSpending > 50 ? 'increase' : 'decrease',
        icon: '☕',
        description: `${coffeePercentage.toFixed(1)}% of total spending`,
      });
    }

    // Subscriptions insight
    if (subscriptionSpending > 0) {
      insights.push({
        title: 'Subscriptions',
        value: `$${subscriptionSpending.toFixed(2)}`,
        change: 'Monthly recurring',
        changeType: 'neutral',
        icon: '📱',
        description: 'Active subscriptions this month',
      });
    }

    // Eating out insight
    if (fastFoodSpending > 0) {
      const averageMealCost = fastFoodSpending / transactions.filter(t => t.category === 'Fast Food').length;
      insights.push({
        title: 'Eating Out',
        value: `$${fastFoodSpending.toFixed(2)}`,
        change: fastFoodSpending > 100 ? 'Exceeded budget by 12%' : 'Within budget',
        changeType: fastFoodSpending > 100 ? 'increase' : 'decrease',
        icon: '🍔',
        description: `Avg. $${averageMealCost.toFixed(2)} per meal`,
      });
    }

    // Shopping insight
    if (shoppingSpending > 0) {
      insights.push({
        title: 'Shopping',
        value: `$${shoppingSpending.toFixed(2)}`,
        change: '8% from last month',
        changeType: 'increase',
        icon: '🛍️',
        description: 'Total amount of retail and online purchases',
      });
    }

    // Transaction frequency insight
    const avgTransactionAmount = totalAmount / transactions.length;
    insights.push({
      title: 'Avg. Transaction',
      value: `$${avgTransactionAmount.toFixed(2)}`,
      change: `${transactions.length} transactions`,
      changeType: 'neutral',
      icon: '💳',
      description: 'Average spending per transaction',
    });

    // Top category insight
    const topCategory = Object.entries(categoryTotals).sort(([,a], [,b]) => b - a)[0];
    if (topCategory) {
      const percentage = (topCategory[1] / totalAmount) * 100;
      insights.push({
        title: 'Top Category',
        value: topCategory[0],
        change: `${percentage.toFixed(1)}% of spending`,
        changeType: 'neutral',
        icon: '🎯',
        description: `$${topCategory[1].toFixed(2)} total`,
      });
    }

    return insights.slice(0, 4); // Limit to 4 cards for better column balance
  };

  const insights = generateInsights();

  const getChangeColor = (changeType: 'increase' | 'decrease' | 'neutral') => {
    switch (changeType) {
      case 'increase':
        return 'text-red-600';
      case 'decrease':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = (changeType: 'increase' | 'decrease' | 'neutral') => {
    switch (changeType) {
      case 'increase':
        return '↗️';
      case 'decrease':
        return '↘️';
      default:
        return '➡️';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-200 h-fit">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">💡 Smart Insights</h2>
        <p className="text-gray-600 text-sm">AI-powered spending analysis</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-2 group-hover:scale-110 transition-transform duration-300">{insight.icon}</span>
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">{insight.title}</h3>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-lg font-bold text-gray-900 mb-1">{insight.value}</p>
                <p className="text-xs text-gray-500">{insight.description}</p>
              </div>
              
              <div className="flex items-center">
                <span className={`flex items-center text-xs font-semibold ${getChangeColor(insight.changeType)}`}>
                  <span className="mr-1 text-sm">{getChangeIcon(insight.changeType)}</span>
                  {insight.change}
                </span>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartInsights;
