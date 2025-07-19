import React, { useState } from 'react';
import type { Transaction } from '../types';

interface CalendarTransactionViewProps {
  transactions: Transaction[];
}

interface DayData {
  date: string;
  amount: number;
  transactionCount: number;
  transactions: Transaction[];
}

const CalendarTransactionView: React.FC<CalendarTransactionViewProps> = ({ transactions }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Group transactions by date
  const transactionsByDate = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = {
        date,
        amount: 0,
        transactionCount: 0,
        transactions: [],
      };
    }
    acc[date].amount += transaction.amount;
    acc[date].transactionCount += 1;
    acc[date].transactions.push(transaction);
    return acc;
  }, {} as Record<string, DayData>);

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const days = generateCalendarDays();
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getDayData = (date: Date): DayData | null => {
    // Format date to match transaction date format (YYYY-MM-DD)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return transactionsByDate[dateString] || null;
  };

  const getSpendingLevel = (amount: number): string => {
    if (amount === 0) return 'bg-gray-100';
    if (amount < 50) return 'bg-green-200';
    if (amount < 100) return 'bg-yellow-200';
    if (amount < 200) return 'bg-orange-200';
    return 'bg-red-200';
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
    setSelectedDate(null);
  };

  const selectedDayData = selectedDate ? transactionsByDate[selectedDate] : null;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-200 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">📅 Calendar View</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
          >
            <span className="text-lg">←</span>
          </button>
          <span className="font-bold text-gray-700 min-w-[150px] text-center text-lg">
            {monthYear}
          </span>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
          >
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3 mb-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
            {day}
          </div>
        ))}
        
        {days.map((date, index) => {
          const dayData = getDayData(date);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const dateString = `${year}-${month}-${day}`;
          const isSelected = selectedDate === dateString;
          
          return (
            <div
              key={index}
              onClick={() => setSelectedDate(isSelected ? null : dateString)}
              className={`
                relative w-12 h-12 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center border-2 mx-auto
                ${isCurrentMonth(date) ? 'hover:border-blue-400 hover:shadow-lg transform hover:scale-110' : 'opacity-40'}
                ${isSelected ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg scale-110' : 'border-gray-200'}
                ${dayData ? getSpendingLevel(dayData.amount) : 'bg-white hover:bg-gray-50'}
              `}
            >
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">
                  {date.getDate()}
                </div>
                
                {dayData && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="flex justify-center">
                      {Array.from({ length: Math.min(dayData.transactionCount, 3) }).map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-blue-500 rounded-full mx-0.5"></div>
                      ))}
                      {dayData.transactionCount > 3 && (
                        <span className="text-xs text-blue-600 font-bold">+</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Day Details */}
      {selectedDayData && (
        <div className="border-t-2 border-blue-100 pt-6">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            {new Date(selectedDate!).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </h3>
          
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-blue-700">
                {selectedDayData.transactionCount} transactions
              </span>
              <span className="font-bold text-blue-900 text-xl">
                ${selectedDayData.amount.toFixed(2)}
              </span>
            </div>
            
            <div className="space-y-3">
              {selectedDayData.transactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    <div>
                      <span className="font-semibold text-gray-900">{transaction.merchant}</span>
                      <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">${transaction.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-gray-600">Spending Level:</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-100 rounded mr-2 border"></div>
              <span className="text-gray-600">None</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-200 rounded mr-2"></div>
              <span className="text-gray-600">Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-200 rounded mr-2"></div>
              <span className="text-gray-600">Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-200 rounded mr-2"></div>
              <span className="text-gray-600">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarTransactionView;
