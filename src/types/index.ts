export interface Transaction {
  date: string;
  merchant: string;
  amount: number;
  category: string;
}

export interface SpendingByCategory {
  [category: string]: number;
}

export interface SpendingSummary {
  totalAmount: number;
  transactionCount: number;
  topCategory: string;
  summary: string;
  spendingByCategory: SpendingByCategory;
}
