import OpenAI from 'openai';
import type { Transaction, SpendingByCategory } from '../types';

// Note: In a real application, you would store this in environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 'your-openai-api-key-here';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo purposes
});

export const analyzeTransactions = async (transactions: Transaction[]): Promise<string> => {
  try {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-openai-api-key-here') {
      // Return a mock summary if no API key is provided
      return generateMockSummary(transactions);
    }

    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const categoryBreakdown = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as SpendingByCategory);

    const prompt = `Analyze these credit card transactions and provide a brief, friendly spending summary:

Total spent: $${totalAmount.toFixed(2)}
Number of transactions: ${transactions.length}

Category breakdown:
${Object.entries(categoryBreakdown)
  .map(([category, amount]) => `- ${category}: $${amount.toFixed(2)}`)
  .join('\n')}

Recent transactions:
${transactions.slice(-5).map(t => `${t.date}: ${t.merchant} - $${t.amount} (${t.category})`).join('\n')}

Please provide a 2-3 sentence summary focusing on spending patterns and any notable insights.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || 'Unable to generate summary.';
  } catch (error) {
    console.error('Error analyzing transactions:', error);
    return generateMockSummary(transactions);
  }
};

const generateMockSummary = (transactions: Transaction[]): string => {
  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const categoryBreakdown = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as SpendingByCategory);

  const topCategory = Object.entries(categoryBreakdown)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown';

  return `You spent a total of $${totalAmount.toFixed(2)} across ${transactions.length} transactions this period. Your highest spending category was ${topCategory} at $${categoryBreakdown[topCategory]?.toFixed(2)}. Consider tracking your ${topCategory} expenses more closely to optimize your budget.`;
};
