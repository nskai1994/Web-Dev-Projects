# 🚀 DataIntel AI Suite

A powerful, all-in-one ecosystem for data analysis, smart reporting, and financial market screening powered by cutting-edge AI and interactive visualizations.

## 🌟 Overview

DataIntel AI Suite is a collection of professional-grade tools designed to transform raw data into actionable insights and professional reports. By combining the power of Large Language Models (LLMs) with robust data visualization libraries, it empowers users to make data-driven decisions faster and more accurately.

---

## 🛠️ Working Components

### 1. 📊 Report Gen
**Smart Report Generator with Interactive Charts**
- **How it works:** Users can upload CSV files or paste raw data. The application features a "Smart Adaptation" engine that automatically maps your data columns to professional templates (Sales, Expenses, Inventory, etc.).
- **Visualization:** Generates dynamic charts via QuickChart integration based on user-selected axes and colors.
- **Export:** Instant downloads in HTML, PDF, and Markdown formats.

### 2. 🤖 Dataset Explainer Pro
**AI-Powered Dataset Analytics**
- **How it works:** Connects to over 50+ AI models via OpenRouter to provide deep analysis of any dataset.
- **Insights:** Automatically detects trends, correlations, outliers, and provides predictive forecasting in natural language.
- **Interactivity:** Features a "Visualization Studio" where users can customize chart types, X/Y axes, and color schemes on the fly.

### 3. 📈 AlgoScreener
**AI-Driven Stock Screening & Strategy Analysis**
- **How it works:** Combines real-time financial data from Alpha Vantage with the reasoning capabilities of advanced LLMs.
- **Strategy Execution:** Users input complex trading strategies in plain English. The AI interprets these strategies and screens the stock universe to find the top 5 optimal picks that match the criteria.
- **Confidence Scoring:** Provides signal strength, confidence ratings, and suggested allocations for each pick.

---

## 💻 Technologies Implemented

- **Core Frontend:** React, Vite, HTML5, CSS3 (Modern Flexbox/Grid layouts).
- **Artificial Intelligence:** OpenRouter API (Integration with Claude 3.5, GPT-4, Llama 3, Mistral, and more).
- **Data Processing:** PapaParse (High-performance CSV parsing), JavaScript ES6+ Data Engines.
- **Visualization:** Chart.js, QuickChart.io API.
- **Financial Data:** Alpha Vantage API Integration.
- **Export Engines:** html2pdf.js, Blob API for Markdown/HTML generation.

---

## 🏆 USP (Unique Selling Propositions)

What makes DataIntel AI Suite unique among competitors:

1.  **Model-Agnostic Intelligence:** Unlike competitors locked into a single AI (like just ChatGPT), our suite leverages OpenRouter to give you access to **50+ cutting-edge models**. You can choose the most cost-effective or most intelligent model for your specific data.
2.  **Zero-Configuration Smart Adaptation:** The "Report Gen" engine can handle mismatched CSV files by automatically identifying and remapping columns to fit standardized templates—saving hours of manual data cleaning.
3.  **Natural Language Strategy Interpretation:** Our AlgoScreener doesn't just filter by numbers; it *understands* trading strategies. You can type "I want momentum stocks with low RSI and high volume confirmation" and the AI handles the complex filtering logic.
4.  **All-In-One Data Lifecycle:** This is the only suite that takes you from **Raw Data** (CSV) → **AI Analysis** (Insights) → **Visualization** (Charts) → **Professional Documentation** (PDF/HTML) in a single workflow.
5.  **Lightweight & Serverless Architecture:** Designed for speed and privacy, performing heavy lifting through efficient API integrations without the need for bloated backend infrastructure.

---

## 🚀 Getting Started

1.  **Static Tools:** Open any file in the `Static/` directory (`ReportGen.html`, `DatasetExplainer.html`, `Finalgo.html`) in a modern web browser to start using the tools immediately.
2.  **React Environment:**
    ```bash
    cd React/RecFind
    npm install
    npm run dev
    ```
