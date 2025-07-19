import React, { useState } from 'react';
import type { Transaction } from '../types';
import DynamicPlaceholderInput from './DynamicPlaceholderInput';

interface AIInputInterfaceProps {
  transactions: Transaction[];
  onAIResponse: (response: string) => void;
  isLoading: boolean;
  customAiResponse?: string;
}

const AIInputInterface: React.FC<AIInputInterfaceProps> = ({
  transactions,
  onAIResponse,
  isLoading,
  customAiResponse,
}) => {
  const [inputValue, setInputValue] = useState('');

  const actionButtons = [
    {
      label: 'Character Analysis',
      prompt: 'Generate a personality insight based on my expense data. What does my spending say about me as a person?',
      icon: '🧠',
    },
    {
      label: 'Expense Analysis',
      prompt: 'Analyze my spending patterns and provide detailed insights about my financial habits.',
      icon: '📊',
    },
    {
      label: 'Habits Insight',
      prompt: 'Tell me if I have any unusual spending habits or patterns that I should be aware of.',
      icon: '🔍',
    },
    {
      label: 'Coffee Addiction',
      prompt: 'Is there any sign of coffee addiction based on my expenses? How much am I spending on coffee?',
      icon: '☕',
    },
  ];

  const handleSubmit = async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;
    
    try {
      // Here you would call your AI analysis function
      // For now, I'll create a mock response based on the prompt
      const response = await generateAIResponse(prompt, transactions);
      onAIResponse(response);
    } catch (error) {
      console.error('Error getting AI response:', error);
      onAIResponse('Sorry, I couldn\'t process your request at this time.');
    }
  };

  const handleActionButton = (prompt: string) => {
    handleSubmit(prompt);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-6 h-fit">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">🤖 AI Assistant</h2>
        <p className="text-gray-600 text-sm">Ask about your spending patterns</p>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {actionButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleActionButton(button.prompt)}
            disabled={isLoading}
            className="group relative flex flex-col items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-lg mb-1 group-hover:scale-110 transition-transform duration-300">{button.icon}</span>
            <span className="text-xs font-medium text-gray-700 text-center leading-tight">
              {button.label}
            </span>
          </button>
        ))}
      </div>

      {/* Text Input */}
      <div className="relative">
        <DynamicPlaceholderInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={() => {
            if (inputValue.trim()) {
              handleSubmit(inputValue);
              setInputValue('');
            }
          }}
          disabled={isLoading}
        />
      </div>

      {/* AI Response Section */}
      {customAiResponse && (
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xs">🤖</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 mb-1 text-sm">AI Response</h4>
              <p className="text-blue-800 text-sm leading-relaxed">{customAiResponse}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock AI response function - replace with actual OpenAI integration
const generateAIResponse = async (prompt: string, transactions: Transaction[]): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const coffeeSpending = transactions
    .filter(t => t.category === 'Coffee')
    .reduce((sum, t) => sum + t.amount, 0);
  const categories = [...new Set(transactions.map(t => t.category))];
  
  if (prompt.toLowerCase().includes('coffee')) {
    return `Based on your expense data, you've spent $${coffeeSpending.toFixed(2)} on coffee this period. ${coffeeSpending > 50 ? 'That\'s quite a bit! ☕ You might want to consider brewing at home sometimes.' : 'Your coffee spending seems reasonable. ☕'}`;
  }
  
  if (prompt.toLowerCase().includes('character') || prompt.toLowerCase().includes('personality')) {
    return `Your spending patterns suggest you're someone who values convenience and experiences. You spend across ${categories.length} different categories, showing a balanced lifestyle. Your total spending of $${totalAmount.toFixed(2)} indicates you're an active consumer who enjoys both necessities and treats.`;
  }
  
  if (prompt.toLowerCase().includes('habits') || prompt.toLowerCase().includes('unusual')) {
    const topCategory = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
    
    const sorted = Object.entries(topCategory).sort(([,a], [,b]) => b - a);
    return `Your biggest spending category is ${sorted[0]?.[0]} at $${sorted[0]?.[1].toFixed(2)}. This represents ${((sorted[0]?.[1] / totalAmount) * 100).toFixed(1)}% of your total spending. Consider if this aligns with your financial goals.`;
  }
  
  return `You've made ${transactions.length} transactions totaling $${totalAmount.toFixed(2)}. Your spending is distributed across ${categories.length} categories, with your most frequent purchases being in ${categories.slice(0, 3).join(', ')}. Overall, your spending patterns look fairly typical for someone with an active lifestyle.`;
};

export default AIInputInterface;
