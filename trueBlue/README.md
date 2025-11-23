# TrueBlue Mobile App

TrueBlue is a mobile application designed to help consumers make informed decisions about the food products they purchase. By scanning a product's barcode, users can quickly access detailed information about its origin, ingredients, and nutritional value. The app's core mission is to provide transparency, especially for users interested in verifying European origin and checking for personal allergens.

## Core Features

- **Barcode Scanning:** Instantly retrieve product information using the device's camera.
- **Origin Verification:** Quickly see if a product originates from the European Union, indicated by a clear visual icon.
- **Personalized Allergen Highlighting:** Users can define a personal list of allergens. When viewing a product's ingredients, these allergens are automatically highlighted.
- **Product Safelist:** Save products to a personal "safelist" for future reference. This list is available even when offline.
- **Offline-First Functionality:** The app is fully functional without an internet connection. Any changes (like adding an item to the safelist) are saved locally and automatically synced to the cloud when the connection is restored.
- **Dark Mode:** A sleek, user-friendly dark mode for comfortable viewing in all lighting conditions.

## Technologies Used

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **UI Component Library:** React Native Paper
- **Routing:** Expo Router
- **Backend & Database:** Firebase (Authentication & Firestore)
- **State Management:** React Context API
- **Local Storage:** AsyncStorage for offline support
- **Icons:** FontAwesome

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed.
- An Expo Go client on your mobile device or an emulator set up.
- A Firebase project with Authentication and Firestore enabled.

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://your-repository-url.com/TrueBlue.git
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Firebase project configuration keys:
    ```
    EXPO_PUBLIC_API_KEY="your-api-key"
    EXPO_PUBLIC_AUTH_DOMAIN="your-auth-domain"
    EXPO_PUBLIC_PROJECT_ID="your-project-id"
    EXPO_PUBLIC_STORAGE_BUCKET="your-storage-bucket"
    EXPO_PUBLIC_MESSAGING_SENDER_ID="your-messaging-sender-id"
    EXPO_PUBLIC_APP_ID="your-app-id"
    ```
4.  **Run the app:**
    ```sh
    npx expo start
    ```
    Scan the QR code with the Expo Go app on your phone.

---

## Functional Analysis

This section outlines the application's functionality, screen by screen.

### 1. Application Goal

TrueBlue is a mobile tool that empowers consumers to:
- Verify a product's origin (EU or non-EU).
- Detect personal allergens in ingredient lists.
- Save products to a persistent "Safelist".
- View health metrics like Nutri-Score.

### 2. Screen Descriptions (Functional Design)

#### A. Login & Sign Up Screens
- **Purpose:** To provide access to personal data (Safelist & Allergens).
- **UI Elements:**
    - Title: "Login" or "Create Account".
    - Input Fields: Email, Password.
    - Primary Button: "Login" or "Sign Up".
    - Secondary Link: A link to toggle between the login and registration forms.
- **Functionality:** Validates input, authenticates the user with Firebase, and navigates to the Home screen upon success.

#### B. Home Screen (`/tabs/index`)
- **Purpose:** A welcoming landing page with quick access to the primary scanning feature.
- **UI Elements:**
    - Logo: (Light mode only) Centered at the top.
    - Welcome Text: "Welcome to TrueBlue".
    - Subtitle: "Your guide to true blue European Products."
    - Call-to-Action Button: A prominent "Scan a Barcode" button.
- **Functionality:** Navigates the user directly to the Scanner tab.

#### C. Scanner Screen (`/tabs/scanner`)
- **Purpose:** To capture a product's barcode using the device's camera.
- **UI Elements:**
    - Camera View: Fills the screen.
    - Loading Indicator: Appears after a successful scan while data is being fetched.
- **Functionality:** Requests camera permission, detects barcodes, provides haptic feedback, and navigates to the Product Detail screen upon fetching data.

#### D. Product Detail Screen (`/product`)
- **Purpose:** To display detailed information about the scanned product.
- **UI Elements:**
    - Title: Product name.
    - Image: Product photo.
    - Info Block:
        - Brand & Quantity.
        - **Origin Indicator:** Displays the country of origin (e.g., "Australian") with a visual icon for EU or non-EU status.
        - **Nutri-Score:** A colored badge (A-E) indicating nutritional value.
    - Ingredients Section: A list of ingredients.
    - Action Buttons: "Add to Safelist" (or "Remove") and "Share".
- **Functionality:**
    - **Allergen Highlighting:** Automatically highlights any ingredients that match the user's personal allergen list.
    - **Dynamic Button:** The "Add/Remove" button's state is dynamically synced with the user's safelist.

#### E. Safelist Screen (`/tabs/safeList`)
- **Purpose:** To display a list of the user's saved products.
- **UI Elements:**
    - Header: "My Safelist".
    - List: A scrollable list of saved products, each with a thumbnail and name.
    - Empty State: A message appears if the list is empty.
- **Functionality:** Allows users to view their saved items. Tapping an item navigates to its Product Detail screen.

#### F. Settings Screen (`/tabs/settings`)
- **Purpose:** To allow app personalization.
- **UI Elements:**
    - **Appearance Section:** A "Dark Mode" toggle switch.
    - **My Allergens Section:**
        - An input field to add a new allergen.
        - An "Add" button.
        - A list of currently saved allergens, each with a "Remove" icon.
    - **Footer:** A "Sign Out" button.
- **Functionality:**
    - Toggles the app's theme.
    - Allows users to manage their personal allergen list, which is saved to their account.
    - Logs the user out and returns to the login screen.
- **Note on UI Library:** The UI for this screen, along with the authentication screens, is built using **React Native Paper**, fulfilling the project requirement for a UI component library.
