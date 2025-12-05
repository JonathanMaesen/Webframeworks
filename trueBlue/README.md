# TrueBlue Mobile App

TrueBlue is a powerful React Native mobile application designed to bring transparency to your grocery shopping. By leveraging the Open Food Facts API, it allows users to instantly scan products to verify their European origin, check for allergens, and assess nutritional quality. Built with a modern tech stack and an offline-first architecture, TrueBlue ensures you can make informed decisions anywhere, anytime.

## Features

### Smart Scanning & Product Insights
- **Barcode Scanner:** Instantly retrieve detailed product data using the device camera.
- **EU Origin Verification:** Automatically detects if a product is manufactured within the European Union, displaying a clear visual indicator.
- **Nutri-Score Visualization:** Easy-to-read color-coded badges (A-E) for nutritional quality.
- **Ingredient Transparency:** Full ingredient lists with automatic highlighting of user-defined allergens.

### Personalization & Safety
- **Custom Allergen Alerts:** Users can define their specific allergens (e.g., "peanuts", "gluten"). The app dynamically scans ingredient lists and highlights these threats in **yellow** (or **gold** in dark mode).
- **Personal Safelist:** Save your favorite "safe" products to a persistent list for quick access.
- **Theme Support:** Fully supported **Dark Mode** and **Light Mode** that respects system settings or user preference.

### Robust & Offline-Ready
- **Offline-First Architecture:** Don't let spotty internet stop you. Add items to your safelist while offline; the app queues your actions and automatically syncs them to the cloud (Firebase Firestore) when connection is restored.
- **Optimistic UI:** Experience instant feedback when interacting with the app, with background synchronization handling the heavy lifting.

## Tech Stack

This project was built using a modern mobile development stack:

- **Framework:** [React Native](https://reactnative.dev/) with [Expo SDK 54](https://expo.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing for robustness)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **UI Library:** [React Native Paper](https://callstack.github.io/react-native-paper/) & Custom Components
- **Backend:** [Firebase](https://firebase.google.com/) (Authentication & Firestore Database)
- **Data Source:** [Open Food Facts API](https://world.openfoodfacts.org/)
- **State Management:** React Context API + AsyncStorage + Firestore Realtime Sync

## Project Structure

The project follows a clean, modular architecture:

```
trueBlue/
├── app/                 # Expo Router screens and layouts
│   ├── (auth)/          # Authentication routes (Login, Signup)
│   ├── (tabs)/          # Main tab navigation (Home, Scanner, Safelist, Settings)
│   └── product.tsx      # Product detail modal
├── components/          # Reusable UI components (AuthForm, HighlightedIngredients, etc.)
├── constants/           # App-wide constants (Colors, Config)
├── context/             # React Context providers (Auth, Theme, Allergen, SafeList)
├── hooks/               # Custom hooks (useBarcodeSearch, etc.)
├── styles/              # Centralized styling using dynamic theme functions
├── types/               # TypeScript interfaces and types
└── utils/               # Helper functions (Country logic, etc.)
```

## Getting Started

### Prerequisites
- Node.js & npm
- Expo Go app on your iOS/Android device (or a simulator)
- A Firebase Project with **Authentication** and **Firestore** enabled.

### Installation

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Firebase:**
    Create a `firebaseConfig.ts` file in the root directory with your credentials:
    ```typescript
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSENDER_ID",
      appId: "YOUR_APP_ID"
    };

    export const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

3.  **Run the app:**
    ```bash
    npx expo start
    ```
    Scan the QR code with your phone to launch the app.

## Screen Overview

1.  **Login / Signup:** Secure entry point powered by Firebase Auth.
2.  **Home (`/tabs/index`):** Dashboard with quick access to scanning.
3.  **Scanner (`/tabs/scanner`):** Live camera view for barcode detection.
4.  **Product Detail (`/product`):** Comprehensive product view. Shows origin, Nutri-Score, and ingredients. Buttons allow adding/removing from Safelist.
5.  **Safelist (`/tabs/safeList`):** Your personal collection of saved products, fetched from Firestore.
6.  **Settings (`/tabs/settings`):** Manage your "Dark Mode" preference and your list of personal allergens.

## Learning Outcomes

This project demonstrates mastery of:
- **Functional Analysis:** Translating requirements into a working app.
- **React Native & Hooks:** Building complex functional components with `useState`, `useEffect`, and custom hooks.
- **Navigation:** Implementing complex flows using **Expo Router**.
- **API Integration:** Consuming external REST APIs (Open Food Facts) and BaaS (Firebase).
- **Offline Capabilities:** Using `AsyncStorage` and sync queues for resilience.
- **Clean Code:** Strictly typed TypeScript and modular file structure.

---
*Built for the Web Frameworks course project.*