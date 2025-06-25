# SimpleSwap - Crypto Exchange Project

A modern, responsive cryptocurrency exchange simulator built with React and Material-UI (MUI). This project demonstrates advanced frontend development skills including custom theming, dark/light mode, animations, and real-time API integration.

![Simpleswap](/img/simpleswap.png)

## ✨ Features

### 🎨 **Modern UI/UX**

-   **Material-UI (MUI) v5** with custom theme configuration
-   **Dark/Light Mode** with system preference detection
-   **Responsive Design** that works on all devices
-   **Smooth Animations** and transitions
-   **Gradient Buttons** and modern card layouts

### 🔧 **Technical Excellence**

-   **Custom Theme System** with comprehensive component overrides
-   **Context API** for theme management
-   **Custom Hooks** for API integration
-   **Error Handling** with user-friendly alerts
-   **Loading States** with skeleton components

### 💰 **Crypto Features**

-   **Real-time Exchange Rates** from CoinGecko API
-   **Live Currency Conversion** with debounced updates
-   **Multiple Cryptocurrencies** support
-   **Exchange Rate Display** with real-time calculations
-   **Simulated Trading** with confirmation feedback

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/simpleswap.git
cd simpleswap

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

### ⚠️ API Notes

-   **Development**: The app uses mock data to avoid CORS issues during local development
-   **Production**: In production, the app will attempt to fetch real-time data from CoinGecko API
-   **API Limits**: CoinGecko has rate limits, so the app gracefully falls back to mock data if needed

## 🔧 Customization

### Theme Configuration

The app uses a comprehensive theme system located in `src/theme.js`:

```javascript
// Custom color palette
const colors = {
  primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0' },
  // ... more colors
};

// Component overrides
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        // ... custom styles
      }
    }
  }
}
```
