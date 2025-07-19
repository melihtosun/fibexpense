import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import type { SpendingByCategory } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SpendingChartProps {
  spendingByCategory: SpendingByCategory;
  chartType?: 'bar' | 'doughnut';
  onChartTypeChange?: (type: 'bar' | 'doughnut') => void;
}

const SpendingChart: React.FC<SpendingChartProps> = ({ 
  spendingByCategory, 
  chartType = 'doughnut',
  onChartTypeChange
}) => {
  const categories = Object.keys(spendingByCategory);
  const amounts = Object.values(spendingByCategory);

  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FF6384',
    '#C9CBCF',
    '#4BC0C0',
    '#FF6384',
  ];

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Spending by Category',
        data: amounts,
        backgroundColor: colors.slice(0, categories.length),
        borderColor: colors.slice(0, categories.length).map(color => color + '80'),
        borderWidth: 1,
      },
    ],
  };

  // Pie chart legend on right, bar chart legend on bottom
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'center' as const,
        labels: {
          boxWidth: 18,
          padding: 18,
        },
      },
      title: {
        display: true,
        text: 'Spending Breakdown by Category',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || context.raw;
            const total = amounts.reduce((sum, amount) => sum + amount, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Spending Breakdown by Category',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || context.raw;
            const total = amounts.reduce((sum, amount) => sum + amount, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toFixed(2);
          }
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-200 h-fit">
      {/* Header with Chart Type Selector */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">📊 Spending Chart</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onChartTypeChange?.('doughnut')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              chartType === 'doughnut'
                ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🥧 Pie
          </button>
          <button
            onClick={() => onChartTypeChange?.('bar')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              chartType === 'bar'
                ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📊 Bar
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className={chartType === 'doughnut' ? "flex flex-row justify-center items-center min-h-[300px]" : "flex justify-center items-center min-h-[300px]"}>
        {chartType === 'bar' ? (
          <Bar data={data} options={barOptions} />
        ) : (
          <Doughnut data={data} options={pieOptions} />
        )}
      </div>
    </div>
  );
};

export default SpendingChart;
