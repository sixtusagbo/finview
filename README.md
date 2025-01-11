# FinView

A clean and user-friendly interface for visualizing and analyzing AAPL's (Apple) annual income statements. The frontend is designed to filter key metrics like revenue, net income, gross profit, EPS (Earnings Per Share), and operating income, providing actionable financial insights.

I built this project with React, TypeScript, Vite and TailwindCSS. The frontend connects to the [FinView API](https://github.com/sixtusagbo/finview-api) to fetch and display the data. The project includes a responsive design, interactive data table, advanced filtering, dynamic sorting, and modern UI/UX.

## Table of Contents

- [Deployment](#deployment)
- [Features](#features)
  - [Interactive Data Table](#interactive-data-table)
  - [Advanced Filtering](#advanced-filtering)
  - [Dynamic Sorting](#dynamic-sorting)
  - [Modern UI/UX](#modern-uiux)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

## Deployment

This web app is deployed on Vercel.

- Try it out: https://finview-omega.vercel.app

## Features

- **Interactive Data Table**:

  - Display key financial metrics including:
    - Date
    - Revenue
    - Net Income
    - Gross Profit
    - EPS (Earnings Per Share)
    - Operating Income

- **Advanced Filtering**:

  - Filter by year range (e.g., 2020-2024)
  - Filter by revenue range (minimum and maximum)
  - Filter by net income range (minimum and maximum)

- **Dynamic Sorting**:

  - Sort by date (ascending/descending)
  - Sort by revenue (ascending/descending)
  - Sort by net income (ascending/descending)

- **Modern UI/UX**:
  - Responsive design for all screen sizes
  - Real-time data updates
  - Loading states with overlay
  - Error handling with user feedback
  - Clean and intuitive interface

## Tech Stack

- **Core**:

  - React
  - TypeScript
  - Vite
  - Tailwind CSS

- **Dependencies**:

  - [Axios](https://github.com/axios/axios) for API requests

## Getting Started

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone https://github.com/sixtusagbo/finview
   cd finview
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```
