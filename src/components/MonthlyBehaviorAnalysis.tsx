import React from 'react';
import type { Transaction } from '../types';

interface MonthlyBehaviorAnalysisProps {
  transactions: Transaction[];
}

interface BehaviorAnalysis {
  month: string;
  emoji: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const MonthlyBehaviorAnalysis: React.FC<MonthlyBehaviorAnalysisProps> = () => {
  // Mock data for monthly behavior analysis
  const monthlyBehaviors: BehaviorAnalysis[] = [
    {
      month: 'July',
      emoji: '🎯',
      title: 'Strategic Spender',
      description: 'You made calculated purchases and showed excellent budget control this month.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      month: 'June',
      emoji: '⚡',
      title: 'Impulsive',
      description: 'Higher than usual spontaneous purchases, especially in entertainment and dining.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      month: 'May',
      emoji: '💰',
      title: 'Saving Master',
      description: 'Remarkable discipline! You kept expenses low and prioritized essential purchases.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      month: 'April',
      emoji: '🛍️',
      title: 'Social Spender',
      description: 'Increased social activities and group expenses. You enjoyed life with friends!',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
          <span className="mr-2">📊</span>
          Monthly Behavior Analysis
        </h3>
        <p className="text-gray-600 text-sm">
          AI analysis of your spending patterns and financial behavior over time
        </p>
      </div>

      <div className="relative">
        {/* Monthly Behavior Items Container */}
        <div className="relative space-y-6">
          {/* Connecting Line - Only for the behavior items */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-300 to-purple-300"></div>
          
          {monthlyBehaviors.map((behavior) => (
            <div key={behavior.month} className="relative flex items-start space-x-4">
              {/* Dot with emoji */}
              <div className={`relative z-10 w-12 h-12 ${behavior.bgColor} rounded-full flex items-center justify-center shadow-md border-2 border-white`}>
                <span className="text-lg">{behavior.emoji}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold text-lg ${behavior.color}`}>
                      {behavior.title}
                    </h4>
                    <span className="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded-full">
                      {behavior.month}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {behavior.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight Box */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              <span className="text-sm">🤖</span>
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-gray-800 mb-1">AI Insight</h5>
              <p className="text-sm text-gray-700">
                Your spending behavior shows a positive trend toward more strategic decisions. 
                Consider maintaining your July approach while allowing occasional social spending for balance.
              </p>
            </div>
          </div>
        </div>

        {/* Trend Indicators */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">📈</span>
              <span className="text-sm font-medium text-green-800">Improving</span>
            </div>
            <p className="text-xs text-green-700 mt-1">Budget control getting better</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">🎯</span>
              <span className="text-sm font-medium text-blue-800">Goal-Oriented</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">Strategic decision making</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBehaviorAnalysis;
