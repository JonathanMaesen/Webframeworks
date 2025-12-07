Functional Analysis: TrueBlue
1. Authentication Screens (Login & Sign Up)

These screens serve as the gateway to the application, ensuring users can secure and synchronize their data (such as the SafeList).
Screen: Login

    Goal: Grant existing users access to the app.

    Functions & Elements:

        Input Fields: The user can enter their email address and password.

        Login Action: Pressing the "Login" button validates the input via Firebase Authentication. Upon success, the user is granted access to the app.

        Navigation: A "Sign Up" link for users who do not yet have an account. This link navigates to the registration screen.

Screen: Sign Up

    Goal: Offer new users the ability to create an account.

    Functions & Elements:

        Account Creation: The user enters an email and password. Clicking "Sign Up" creates a new account in the backend.

        Navigation: A "Login" link to return to the login screen if the user already possesses an account.

2. Scanner (Home Tab)

This is the main screen where the core functionality of the app takes place: identifying products.
Screen: Scanner

    Goal: Scanning barcodes to retrieve product information.

    Functions & Elements:

        Camera View: Displays a live feed from the camera (if permission is granted).

        Permission Management: If the app lacks camera access, a clear message is displayed with a button to request permission again.

        Automatic Detection: The scanner automatically recognizes QR codes, EAN-13, and other barcode types.

        Haptic Feedback: Upon a successful scan, the phone vibrates to provide feedback to the user.

        API Integration: The scanned code is immediately sent to the external API to fetch product data.

        Status Indication: A loading screen (spinner) indicates that the app is searching.

        Automatic Navigation: Once the product is found, the app automatically navigates to the Product Detail screen.

        Error Handling: If a product is not found, the user receives an alert notification.

3. Product Detail

This screen displays the results of a scan or an item selected from the saved list.
Screen: Product Page

    Goal: Display detailed information about a specific product and enable interaction (save/share).

    Functions & Elements:

        Product Header: Shows the name and an image of the product.

        Info Blocks: Displays metadata such as the brand, quantity, and origin.

        Origin Logic: The app analyzes the 'manufacturing places'.

            Is it from the EU? A green checkmark is displayed.

            Is it from outside the EU? A red cross is displayed.

        Nutri-Score: A visual badge (color-coded from A to E) indicating nutritional value.

        Ingredients: A text view of the ingredients. If configured in settings, allergens are highlighted here (HighlightedIngredients).

        SafeList Action Button: A dynamic button.

            Product not in list? Button says "Add to Safelist" (saves product to database).

            Product already in list? Button says "Remove from Safelist" (deletes product and turns red).

        Share Function: A button to share the product name and link via the phone's standard 'share sheet' (e.g., to WhatsApp or Mail).

4. My Safelist (Tab)

An overview of favorite or 'safe' products that the user has previously scanned.
Screen: SafeList

    Goal: Manage a personal archive of products.

    Functions & Elements:

        List View: A scrollable list (FlatList) of all saved products.

        Item Preview: Each item in the list shows a thumbnail image, the product name, and the brand.

        Navigation: Clicking on an item takes the user to the Product Detail screen for that specific product.

        Empty State: If the list is empty, instructional text is shown ("Scan a product to add it here") to guide the user.

        Offline/Online Sync: (Background process) The list synchronizes changes with the Firebase database when internet is available, and saves data locally (AsyncStorage) for offline use.

5. Settings (Tab)

The configuration screen for personal preferences and account management.
Screen: Settings

    Goal: Personalize the app and manage allergens.

    Functions & Elements:

        Appearance (Dark Mode): A switch allowing the user to toggle the app's theme between light and dark. This immediately adjusts the colors throughout the entire app.

        Allergen Management:

            Add: An input field and "Add" button to add specific allergens (e.g., "peanuts") to a personal filter list.

            List: An overview of configured allergens.

            Remove: A trash can icon next to each allergen to remove it from the filter list.

        Sign Out: A red action button to safely log out of the account and return to the login screen.