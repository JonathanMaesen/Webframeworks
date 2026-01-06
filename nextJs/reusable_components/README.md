# Spotifi Showcase

A component library showcase disguised as a music store application.

## Tech Stack

*   **Framework:** Next.js 16 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4
*   **Database:** MongoDB
*   **Auth:** Custom JWT (bcrypt + jsonwebtoken)
*   **Validation:** Zod

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Set up environment variables in `.env`:
    ```env
    MONGODB_URI=mongodb://localhost:27017/spotifi_showcase
    JWT_SECRET=your_super_secret_key
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

## Key Features

*   **Server Actions:** Used for all data mutations (Login, Register).
*   **React 19 Hooks:** `useActionState` for form handling, `useTransition` for search.
*   **Middleware:** `src/proxy.ts` for route protection.
*   **Reusable Components:** Located in `src/components/ui`.
