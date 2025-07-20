import { useState, useEffect } from 'react';
import type { Transaction, SpendingSummary as SpendingSummaryType } from '../types';
import { analyzeTransactions } from '../utils/openai';
import SpendingSummary from '../components/SpendingSummary';
import SpendingChart from '../components/SpendingChart';
import TransactionList from '../components/TransactionList';
import AIInputInterface from '../components/AIInputInterface';
import SmartInsights from '../components/SmartInsights';
import CalendarTransactionView from '../components/CalendarTransactionView';
import ExpenseSuggestions from '../components/ExpenseSuggestions';
import ProfileSection from '../components/ProfileSection';
import MonthlyBehaviorAnalysis from '../components/MonthlyBehaviorAnalysis';
import mockTransactions from '../data/mockTransactions.json';

function HomePage() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [summary, setSummary] = useState<SpendingSummaryType | null>(null);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [customAiResponse, setCustomAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomAiLoading, setIsCustomAiLoading] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'doughnut'>('doughnut');

  useEffect(() => {
    // Calculate spending summary
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const spendingByCategory = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as { [key: string]: number });

    const topCategory = Object.entries(spendingByCategory)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown';

    const summaryData: SpendingSummaryType = {
      totalAmount,
      transactionCount: transactions.length,
      topCategory,
      summary: '',
      spendingByCategory,
    };

    setSummary(summaryData);

    // Get AI analysis
    const getAIAnalysis = async () => {
      setIsLoading(true);
      try {
        const analysis = await analyzeTransactions(transactions);
        setAiSummary(analysis);
      } catch (error) {
        console.error('Error getting AI analysis:', error);
        setAiSummary('Unable to generate AI insights at this time.');
      } finally {
        setIsLoading(false);
      }
    };

    getAIAnalysis();
  }, [transactions]);

  const handleAIResponse = async (response: string) => {
    setIsCustomAiLoading(true);
    // Simulate a delay for the AI response
    setTimeout(() => {
      setCustomAiResponse(response);
      setIsCustomAiLoading(false);
    }, 500);
  };

  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your financial insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                💳 FibExpense
              </h1>
              <p className="text-gray-600 mt-1 font-medium text-sm md:text-base">Smarter spending, powered by AI.</p>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Profile Section */}
      <div className="fixed left-8 top-36 z-30 hidden xl:block" style={{ left: 'calc((100vw - 1280px) / 2 - 280px)' }}>
        <div className="w-64">
          <ProfileSection />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg: py-8">
        {/* Optimized Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Primary Content */}
          <div className="lg:col-span-7 space-y-8 -mt-8">

            {/* Mobile Profile Section - Only visible on smaller screens */}
            <div className="w-full xl:hidden">
              <ProfileSection />
            </div>

            {/* AI Assistant Interface */}
            <div className="w-full">
              <AIInputInterface
                transactions={transactions}
                onAIResponse={handleAIResponse}
                isLoading={isCustomAiLoading}
                customAiResponse={customAiResponse}
              />
            </div>

            {/* Spending Summary & Analytics */}
            <div className="w-full">
              <SpendingSummary
                summary={summary}
                aiSummary={aiSummary}
                isLoading={isLoading}
              />
            </div>

            {/* Monthly Behavior Analysis */}
            <div className="w-full">
              <MonthlyBehaviorAnalysis transactions={transactions} />
            </div>

            {/* Transaction History */}
            <div className="w-full">
              <TransactionList transactions={transactions} />
            </div>

          </div>

          {/* Right Column - Insights & Visualization */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Interactive Chart */}
            <div className="w-full">
              <SpendingChart
                spendingByCategory={summary.spendingByCategory}
                chartType={chartType}
                onChartTypeChange={setChartType}
              />
            </div>

            {/* Smart Insights Cards */}
            <div className="w-full">
              <SmartInsights transactions={transactions} />
            </div>

            {/* AI-Powered Expense Suggestions */}
            <div className="w-full">
              <ExpenseSuggestions transactions={transactions} />
            </div>

            {/* Calendar Transaction View */}
            <div className="w-full">
              <CalendarTransactionView transactions={transactions} />
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-md border-t border-white/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-semibold">Built for Fintern Hackathon</span> • 
              <span className="mx-2">Powered by OpenAI GPT-3.5</span> • 
              <span>Data visualization with Chart.js</span>
            </p>
            <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <span className="mr-1">🤖</span>
                AI-Powered
              </span>
              <span className="flex items-center">
                <span className="mr-1">📊</span>
                Interactive Charts
              </span>
              <span className="flex items-center">
                <span className="mr-1">📱</span>
                Responsive Design
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
