import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  // Mock data for analytics dashboard
  const monthlyTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Coffee Spending Trend',
        data: [2800, 3200, 3500, 3800, 4100, 4600],
        backgroundColor: 'rgba(139, 69, 19, 0.6)',
        borderColor: 'rgba(139, 69, 19, 1)',
        borderWidth: 2,
      },
      {
        label: 'Restaurant Spending',
        data: [8200, 7800, 8500, 9200, 8900, 9800],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      }
    ],
  };

  const unusualActivityData = {
    labels: ['Normal Transactions', 'Unusual High Value', 'Off-Pattern Time', 'New Merchant'],
    datasets: [
      {
        data: [87.2, 6.8, 3.5, 2.5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(99, 102, 241, 0.8)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const realTimeTransactions = [
    { id: 1, time: '14:23', merchant: 'Starbucks Kadıköy', amount: 45.50, category: 'Coffee', risk: 'Low', userId: 'USR001' },
    { id: 2, time: '14:18', merchant: 'Amazon', amount: 299.99, category: 'Shopping', risk: 'Medium', userId: 'USR045' },
    { id: 3, time: '14:15', merchant: 'Shell Bostancı', amount: 180.00, category: 'Fuel', risk: 'Low', userId: 'USR023' },
    { id: 4, time: '14:12', merchant: 'Migros', amount: 127.30, category: 'Grocery', risk: 'Low', userId: 'USR067' },
    { id: 5, time: '14:09', merchant: 'Gloria Jeans Ataşehir', amount: 67.80, category: 'Coffee', risk: 'Low', userId: 'USR089' },
    { id: 6, time: '14:05', merchant: 'Netflix', amount: 54.99, category: 'Entertainment', risk: 'High', userId: 'USR012' },
  ];

  const patternInsights = [
    {
      id: 1,
      title: 'Coffee Spending Surge',
      description: 'Our Pattern Analysis Agent detected a 21% increase in coffee spending across FibaBanka customers this month.',
      suggestion: 'FibaBanka should create a coffee loyalty campaign or establish partnerships with major coffee chains like Starbucks, Kahve Dünyası, and Gloria Jeans to offer cashback rewards.',
      impact: 'High',
      affectedCustomers: '45,230',
      potentialRevenue: '₺125,000'
    },
    {
      id: 2,
      title: 'E-commerce Transaction Growth',
      description: 'Online shopping transactions increased by 34% with peak activity during 20:00-22:00 timeframe.',
      suggestion: 'FibaBanka should partner with major e-commerce platforms (Trendyol, Hepsiburada, Amazon TR) to offer instant financing options and exclusive discounts for cardholders.',
      impact: 'Very High',
      affectedCustomers: '78,450',
      potentialRevenue: '₺340,000'
    },
    {
      id: 3,
      title: 'Fuel Station Loyalty Opportunity',
      description: 'Customers show strong preference for specific fuel brands, with Shell and BP accounting for 67% of fuel transactions.',
      suggestion: 'FibaBanka should negotiate exclusive fuel partnerships offering 3-5% cashback on fuel purchases, targeting the growing vehicle ownership segment.',
      impact: 'Medium',
      affectedCustomers: '32,180',
      potentialRevenue: '₺89,500'
    }
  ];

  const unusualActivities = [
    { time: '13:45', type: 'High Value Transaction', description: 'Transaction of ₺15,000 at jewelry store - 850% above user average', userId: 'USR156', riskScore: 8.7 },
    { time: '13:32', type: 'Location Anomaly', description: 'Card used in Ankara while last transaction was in Istanbul 30 minutes ago', userId: 'USR298', riskScore: 9.2 },
    { time: '13:28', type: 'Merchant Category Change', description: 'User typically spends on groceries, sudden luxury purchase detected', userId: 'USR067', riskScore: 6.4 },
    { time: '13:15', type: 'Time Pattern Deviation', description: 'Transaction at 3 AM - outside typical usage hours for this customer', userId: 'USR445', riskScore: 7.1 },
  ];

  const keyMetrics = [
    { title: 'Active Users', value: '156,789', change: '+12.5%', trend: 'up' },
    { title: 'Transaction Volume', value: '₺45.2M', change: '+18.7%', trend: 'up' },
    { title: 'Avg Transaction Value', value: '₺287', change: '+5.2%', trend: 'up' },
    { title: 'Fraud Detection Rate', value: '99.7%', change: '+0.3%', trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">FibExpense B2B Analytics</h1>
          <p className="text-lg text-gray-600">Advanced Pattern Analysis & Business Intelligence for Financial Institutions</p>
          <div className="mt-4 inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live Data Stream Active
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  {metric.trend === 'up' ? '↗' : '↘'} {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Pattern Insights */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg mr-3">🤖</span>
            AI Pattern Analysis & Business Opportunities
          </h2>
          <div className="space-y-6">
            {patternInsights.map((insight) => (
              <div key={insight.id} className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{insight.title}</h3>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      insight.impact === 'Very High' ? 'bg-red-100 text-red-800' :
                      insight.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {insight.impact} Impact
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{insight.description}</p>
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 mb-4">
                  <p className="text-gray-800 font-medium">💡 Recommendation:</p>
                  <p className="text-gray-700 mt-2">{insight.suggestion}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-gray-600">Affected Customers</p>
                    <p className="font-bold text-blue-600">{insight.affectedCustomers}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Potential Revenue</p>
                    <p className="font-bold text-green-600">{insight.potentialRevenue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Implementation Time</p>
                    <p className="font-bold text-purple-600">2-4 weeks</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Spending Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Spending Trends</h3>
            <Line 
              data={monthlyTrendData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Category Spending Analysis (₺)',
                  },
                },
              }}
            />
          </div>

          {/* Unusual Activity Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Transaction Risk Analysis</h3>
            <Doughnut 
              data={unusualActivityData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                  title: {
                    display: true,
                    text: 'Transaction Pattern Distribution (%)',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Real-time Transaction Monitoring */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-2 rounded-lg mr-3">📊</span>
            Real-time Transaction Monitoring
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Time</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Merchant</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Amount</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Risk Level</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">User ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {realTimeTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{transaction.time}</td>
                    <td className="px-4 py-3 text-gray-800">{transaction.merchant}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">₺{transaction.amount}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.risk === 'Low' ? 'bg-green-100 text-green-800' :
                        transaction.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.risk}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">{transaction.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Unusual Activity Alerts */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg mr-3">⚠️</span>
            Unusual Activity Detection
          </h2>
          <div className="space-y-4">
            {unusualActivities.map((activity, index) => (
              <div key={index} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold mr-3">
                        {activity.type}
                      </span>
                      <span className="text-sm text-gray-600">{activity.time}</span>
                    </div>
                    <p className="text-gray-800 mb-2">{activity.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">User: <span className="font-mono">{activity.userId}</span></span>
                      <span className="text-gray-600">Risk Score: <span className="font-bold text-red-600">{activity.riskScore}/10</span></span>
                    </div>
                  </div>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors">
                    Investigate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Value Proposition */}
        {/* <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Why Choose FibExpense for Your Bank?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold mb-2">Increase Revenue</h3>
              <p className="text-sm opacity-90">Our AI identifies customer spending patterns to help you create targeted campaigns and partnerships that increase transaction volume and fee income.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-lg font-semibold mb-2">Reduce Fraud</h3>
              <p className="text-sm opacity-90">Advanced pattern recognition detects unusual transactions in real-time, reducing fraud losses and protecting your customers' assets.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="text-lg font-semibold mb-2">Customer Insights</h3>
              <p className="text-sm opacity-90">Deep analytics provide actionable insights about customer behavior, enabling personalized financial products and improved customer retention.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Schedule a Demo with FibaBanka
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Analytics;
