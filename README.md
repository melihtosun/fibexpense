# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 💳 Smart Spending Summary

A minimal React application that analyzes credit card transactions using OpenAI and displays interactive spending summaries with charts.

## ⚡️ Features

- **Mock Transaction Data**: Loads sample credit card transactions from JSON
- **AI-Powered Analysis**: Uses OpenAI GPT-3.5 to generate spending insights
- **Interactive Charts**: Pie and bar charts showing spending breakdown by category
- **Responsive Design**: Clean, modern UI built with TailwindCSS
- **Real-time Insights**: Analyzes spending patterns and provides actionable feedback

## 🛠️ Tech Stack

- **React** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Axios** for API requests
- **OpenAI API** (GPT-3.5) for transaction analysis
- **Chart.js** with react-chartjs-2 for data visualization

## 🚀 Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your OpenAI API key:**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🔧 Configuration

### OpenAI API Key

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to your `.env` file:
   ```
   VITE_OPENAI_API_KEY=your-actual-api-key-here
   ```

> **Note**: If no API key is provided, the app will use mock AI summaries for demonstration purposes.

## 📊 Mock Data

The application uses sample transaction data from `src/data/mockTransactions.json`. Each transaction includes:

- `date`: Transaction date
- `merchant`: Store/service name  
- `amount`: Transaction amount
- `category`: Spending category (Coffee, Transport, Shopping, etc.)

## 🎯 What It Does

1. **Loads Transactions**: Reads mock credit card data
2. **Analyzes Spending**: Calculates totals, categories, and patterns
3. **AI Insights**: Sends data to OpenAI for intelligent analysis
4. **Visualizes Data**: Creates interactive charts showing spending breakdown
5. **Displays Summary**: Shows key metrics and AI-generated insights

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── SpendingChart.tsx
│   ├── SpendingSummary.tsx
│   └── TransactionList.tsx
├── data/               # Mock transaction data
│   └── mockTransactions.json
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── openai.ts
└── App.tsx            # Main application component
```

## 🎨 UI Components

- **Spending Summary**: Overview cards with total amount, transaction count, and top category
- **AI Insights**: GPT-generated analysis of spending patterns
- **Transaction List**: Detailed view of recent transactions with category badges
- **Interactive Charts**: Toggle between pie chart and bar chart views

## 🔄 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

Built files will be in the `dist/` directory after running `npm run build`. Deploy to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 📝 License

This project is built for hackathon purposes. Feel free to use and modify as needed!

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
