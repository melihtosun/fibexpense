import React, { useState, useEffect } from 'react';

interface DynamicPlaceholderInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const DynamicPlaceholderInput: React.FC<DynamicPlaceholderInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
}) => {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const placeholders = [
    "Ask me anything about your spending patterns...",
    "What's my biggest expense category this month?",
    "Do I have any unusual spending habits?",
    "How much did I spend on coffee lately?",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setIsAnimating(false);
      }, 300); // Half of the animation duration
      
    }, 3000); // Change placeholder every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
          />
          
          {/* Dynamic Placeholder */}
          {!value && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none overflow-hidden h-6">
              <div
                className={`transition-transform duration-600 ease-in-out ${
                  isAnimating ? '-translate-y-6 opacity-0' : 'translate-y-0 opacity-100'
                }`}
              >
                <span className="text-gray-400 text-base select-none">
                  {placeholders[currentPlaceholderIndex]}
                </span>
              </div>
              <div
                className={`absolute top-6 transition-transform duration-600 ease-in-out ${
                  isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <span className="text-gray-400 text-base select-none">
                  {placeholders[(currentPlaceholderIndex + 1) % placeholders.length]}
                </span>
              </div>
            </div>
          )}
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            💬
          </div>
        </div>
        
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {disabled ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Thinking...</span>
            </div>
          ) : (
            <span className="flex items-center space-x-2">
              <span>Ask AI</span>
              <span>✨</span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default DynamicPlaceholderInput;
