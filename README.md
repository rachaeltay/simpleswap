# SimpleSwap - Crypto Exchange Project

A modern, responsive cryptocurrency exchange simulator built with React and Material-UI (MUI). This project demonstrates advanced frontend development skills including custom theming, dark/light mode, animations, and real-time API integration.

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

## 🛠️ Built With

-   **React 18** - Modern React with hooks
-   **Material-UI (MUI) v5** - Component library with custom theming
-   **Emotion** - CSS-in-JS styling
-   **CoinGecko API** - Real-time cryptocurrency data
-   **React Context** - State management
-   **Custom Hooks** - Reusable logic

## 🎯 Portfolio Highlights

### **Advanced MUI Configuration**

-   Custom theme with light/dark mode support
-   Component-level style overrides
-   Responsive typography system
-   Consistent design tokens

### **Modern React Patterns**

-   Functional components with hooks
-   Custom context for theme management
-   Error boundaries and loading states
-   Debounced API calls

### **Professional UX**

-   Smooth animations and transitions
-   Accessibility features
-   Mobile-first responsive design
-   Intuitive user interface

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

### Adding New Features

-   **New Cryptocurrencies**: Update the API endpoint in `useCoinGecko.jsx`
-   **Custom Themes**: Modify `src/theme.js` for new color schemes
-   **Additional Components**: Follow the existing pattern in `src/components/`

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📦 Build

```bash
# Build for production
npm run build

# Analyze bundle size
npm run build -- --analyze
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
