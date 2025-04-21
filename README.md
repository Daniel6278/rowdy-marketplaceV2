<<<<<<< HEAD
# Rowdy Marketplace

A marketplace app for UTSA students to buy and sell items within the campus community.

## Overview

Rowdy Marketplace is a simple e-commerce platform designed to help UTSA students buy and sell used items. This project is a test application built with React and CSV-based data persistence.

**Note: This is a test application and not intended for actual production use.**

## Features

- User authentication (registration and login)
- Browse and search product listings
- Filter products by category, price, and condition
- Create and manage product listings
- Shopping cart functionality
- Order management
- Transaction completion tracking

## Tech Stack

- **Frontend**: 
  - React 
  - React Router for navigation
  - Tailwind CSS for styling (v3.3.5)
  - Zustand for state management
  - React Hot Toast for notifications
  - PapaParse for CSV parsing

- **Data Management**:
  - CSV files for data structure
  - localStorage for client-side data persistence
  - Custom CSV services layer that mimics database operations

- **Development**:
  - Vite as the build tool

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v8 or higher recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rowdy-marketplace.git
   cd rowdy-marketplace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Test Accounts

The application comes with pre-populated test accounts:

- **Email**: jane@example.com
- **Password**: password123

- **Email**: mike@example.com
- **Password**: password123

### Sample Data

The app initializes with sample product listings and order data for testing purposes.

## Development

### Project Structure

```
rowdy-marketplace/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── store/          # Zustand state management
│   ├── services/       # Services for data operations
│   ├── data/           # Sample data
│   ├── assets/         # Static assets
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Public assets
└── ...                 # Config files
```

## License

This project is MIT licensed.

## Disclaimer

This application is for educational and testing purposes only. It uses localStorage for data persistence, which is not secure for real user data. In a production environment, a proper backend and database would be necessary. 
=======
# rowdy-marketplaceV2
>>>>>>> 88b26f1785f02518b62f9ef9b172da6674c6e38e
