# React Cheatsheet

This cheatsheet provides a quick reference for common React concepts and practices.

## State Management

State is used to manage data that changes over time in a component.

### Declaring State

Use the `useState` hook to declare a state variable.

```tsx
import { useState } from 'react';

function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  // ...
  return <div>{count}</div>
}
```

### Updating State

When updating state, especially for objects and arrays, always create a copy of the state variable before making changes. Then, pass the copy to the setter function.

#### Updating Objects in State

```tsx
import { useState } from 'react';

interface User {
  name: string;
  age: number;
}

const [user, setUser] = useState<User>({ name: 'John', age: 30 });

const handleAgeChange = (): void => {
  const newUser = { ...user, age: user.age + 1 }; // Create a copy
  setUser(newUser); // Pass the copy to the setter
};
```

#### Updating Arrays in State

When working with arrays in state, it's important to create a new array instead of modifying the existing one directly. The spread operator (`...`) is a concise way to do this.

**Adding an Item to an Array**

```tsx
import { useState } from 'react';

const [items, setItems] = useState<string[]>(['Apple', 'Banana']);

const handleAddItem = (): void => {
  // Create a new array with the existing items and add the new one
  setItems([...items, 'Cherry']); 
};
```

This creates a new array containing all the elements of the original `items` array, plus the new item 'Cherry', and then updates the state with this new array.


### Controlled Components

Input fields in React should always be "controlled," meaning their values are tied to a state variable. The `onChange` event is used to update the state as the user types.

```tsx
import { useState, ChangeEvent } from 'react';

const [name, setName] = useState<string>('');

<input
  type="text"
  value={name}
  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
/>
```

### Lifting State Up

When multiple components need to share and react to the same state, it's a common practice to lift that state up to their closest common ancestor. The parent component then passes the state down to the children via props, and the children can notify the parent of any changes by calling functions passed down from the parent.

**Example:**

Imagine a parent component with two child components: one to display a value and another to update it.

```tsx
import { useState } from 'react';

// Child component to display the value
interface DisplayProps {
  value: number;
}

function Display({ value }: DisplayProps): JSX.Element {
  return <p>The value is: {value}</p>;
}

// Child component to update the value
interface UpdaterProps {
  onUpdate: (newValue: number) => void;
}

function Updater({ onUpdate }: UpdaterProps): JSX.Element {
  return <button onClick={() => onUpdate(Math.random())}>Update Value</button>;
}

// Parent component that owns the state
function Parent(): JSX.Element {
  const [value, setValue] = useState<number>(0);

  const handleUpdate = (newValue: number): void => {
    setValue(newValue);
  };

  return (
    <div>
      <Display value={value} />
      <Updater onUpdate={handleUpdate} />
    </div>
  );
}
```

## Conditional Rendering

You can render different components or elements based on certain conditions.

### `if` Statements

You can use a standard `if` statement to conditionally render a component.

```tsx
interface GreetingProps {
  isLoggedIn: boolean;
}

function Greeting({ isLoggedIn }: GreetingProps): JSX.Element {
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function UserGreeting(): JSX.Element {
    return <h1>Welcome back!</h1>
}

function GuestGreeting(): JSX.Element {
    return <h1>Please sign up.</h1>
}
```

### Logical `&&` Operator

For simpler conditional rendering, you can use the logical `&&` operator. The expression after `&&` will only be rendered if the condition is `true`.

```tsx
interface MailboxProps {
  unreadMessages: string[];
}

function Mailbox({ unreadMessages }: MailboxProps): JSX.Element {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      )}
    </div>
  );
}
```

## Rendering Lists

The most common way to render a list of items in React is to use the `map()` array method to transform an array of data into an array of JSX elements. A common pattern is to first manipulate the data (e.g., by filtering or sorting it) and then map over the result.

**Important:** Always provide a unique `key` prop for each element in a list. This helps React identify which items have changed, are added, or are removed, which improves performance.

### Example: Filtering and Mapping

This example shows how to render a filtered list of products.

```tsx
import React from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1200 },
  { id: 2, name: 'T-Shirt', category: 'Apparel', price: 25 },
  { id: 3, name: 'Keyboard', category: 'Electronics', price: 75 },
  { id: 4, name: 'Jeans', category: 'Apparel', price: 60 },
];

function ProductList(): JSX.Element {
  // First, filter the array to get only electronics
  const electronicProducts = products.filter(product => product.category === 'Electronics');

  return (
    <div>
      <h2>Electronics</h2>
      <ul>
        {/* Then, map over the filtered array to render the list */}
        {electronicProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Quick Syntax for Array Methods

Here are concise, strongly-typed examples for common array methods used for data manipulation in React.

#### `map()`

Creates a new array by applying a function to every element.

```tsx
const numbers: number[] = [1, 2, 3];
const doubled: number[] = numbers.map((num: number) => num * 2);
// doubled is [2, 4, 6]
```

#### `filter()`

Creates a new array with all elements that pass a test.

```tsx
const numbers: number[] = [1, 2, 3, 4, 5, 6];
const evens: number[] = numbers.filter((num: number) => num % 2 === 0);
// evens is [2, 4, 6]
```

#### `reduce()`

Executes a reducer function to produce a single output value.

```tsx
const numbers: number[] = [1, 2, 3, 4, 5];
const sum: number = numbers.reduce((accumulator: number, current: number) => accumulator + current, 0);
// sum is 15
```

#### `sort()`

Sorts the elements of an array. Note: `sort()` modifies the original array in place.

```tsx
const numbers: number[] = [4, 2, 5, 1, 3];
numbers.sort((a: number, b: number) => a - b); // For ascending order
// numbers is now [1, 2, 3, 4, 5]
```

## Effects

Effects let you run side effects in your components, such as fetching data, subscribing to a service, or manually changing the DOM. The `useEffect` hook is used to manage effects.

### Basic Usage

By default, effects run after every completed render.

```tsx
import { useState, useEffect } from 'react';

function Example(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  // This effect runs after every render
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Controlling When Effects Run: The Dependency Array

You can control when an effect runs by passing a second argument to `useEffect`, which is an array of dependencies.

#### Running an Effect Only Once

To run an effect only once after the initial render (like `componentDidMount` in class components), pass an empty dependency array (`[]`). This is useful for one-time setup like data fetching.

```tsx
import { useEffect } from 'react';

useEffect(() => {
  // This runs only once after the initial render
  console.log('Component mounted');
}, []); // Empty dependency array
```

#### Running an Effect When Dependencies Change

To re-run an effect only when specific values (props or state) have changed, include them in the dependency array.

```tsx
import { useState, useEffect } from 'react';

const [name, setName] = useState<string>('John');

useEffect(() => {
  // This effect runs whenever the 'name' state changes
  console.log(`The name is now ${name}`);
}, [name]); // Dependency array with 'name'
```

### Cleaning Up an Effect

Some effects need cleanup, like unsubscribing from a data source or cancelling a network request. To do this, return a function from your effect. React will run this cleanup function before the component unmounts and before re-running the effect due to a dependency change.

A common use case is aborting a fetch request to prevent memory leaks. For a complete, real-world example of this pattern, see the `useFetch` hook in the **Custom Hooks** section.

## Custom Hooks

Custom hooks are a powerful feature in React that let you extract component logic into reusable functions. A custom hook is a JavaScript function whose name starts with `use` and that may call other hooks. A powerful pattern is to extract data fetching logic into a custom hook. This makes your components cleaner and the fetching logic reusable across your application.

### 1. Creating a Generic `useFetch` Hook

This hook can fetch any type of data from any URL. It handles the loading and error states, and it uses generics (`<T>`) to provide strong type safety for the data it returns.

```tsx
// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true, error: null }));

        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: T = await response.json();
        setState({ data, isLoading: false, error: null });

      } catch (error: unknown) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setState({ data: null, isLoading: false, error: error.message });
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]); // Re-run the effect if the URL changes

  return state;
}
```

### 2. Using the `useFetch` Hook

Now, a component can be greatly simplified by calling the `useFetch` hook, passing the desired URL and the expected type, and receiving the data, loading state, and error state in return.

```tsx
// src/components/UserList.tsx
import React from 'react';
import { useFetch } from '../hooks/useFetch';

interface User {
  id: number;
  name: string;
}

function UserList(): JSX.Element {
  const { data: users, isLoading, error } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error fetching users: {error}</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users && users.map((user: User) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Key Benefits:**
- **Simplicity:** The component is now much shorter and easier to understand, as the complex fetching logic has been abstracted away.
- **Reusability:** You can use the `useFetch` hook in any component to fetch any kind of data (e.g., posts, products, comments) just by changing the URL and the type argument.
- **Type Safety:** Because `useFetch` is generic, TypeScript knows that the `data` it returns will be an array of `User` objects, providing excellent autocompletion and error checking.

## Context

Context provides a way to pass data through the component tree without having to pass props down manually at every level. It's a good way to manage global data like themes, user authentication, or language settings.

### Creating a Context

Create a new folder (e.g., `src/context`) and a new file (e.g., `src/context/ThemeContext.ts`) to define your context.

```tsx
// src/context/ThemeContext.ts
import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export const ThemeContext = createContext<Theme>('light');
```

### Providing a Context

Wrap your component tree with the context provider and provide a value.

```tsx
// src/App.tsx
import { ThemeContext, Theme } from './context/ThemeContext';
import Toolbar from './Toolbar';
import { useState } from 'react';

function App(): JSX.Element {
  const [theme, setTheme] = useState<Theme>('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

### Consuming a Context

Use the `useContext` hook to consume the context value in a child component.

```tsx
// src/Toolbar.tsx
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

function Toolbar(): JSX.Element {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}
```

## Client-Side Routing

In a Single-Page Application (SPA), client-side routing allows you to navigate between different views or pages without a full page reload. Libraries like `react-router-dom` are commonly used for this.

### Basic Routing Example

This example shows the essential components for setting up basic navigation.

1.  **Install the library:**

    ```bash
    npm install react-router-dom
    ```

2.  **Configure the routes:**

    Wrap your main application component with `BrowserRouter` and define your routes using `Routes`, `Route`, and `Link`.

    ```tsx
    // src/App.tsx
    import React from 'react';
    import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

    const Home = () => <h2>Home</h2>;
    const About = () => <h2>About</h2>;

    function App(): JSX.Element {
      return (
        <BrowserRouter>
          <nav>
            <Link to="/">Home</Link> | <Link to="/about">About</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      );
    }
    ```

For more advanced features like nested routes, URL parameters, and layouts, refer to the course material https://similonap.github.io/webframeworks-cursus/wf-course/react/routing.

---

# Comprehensive React 19 & Next.js 16 Cheatsheet

This guide combines core React fundamentals with modern Next.js 16 architecture, tailored for the Spotifi project structure.

---

## Part 1: React Fundamentals (The Foundation)

### State Management (useState)
State manages data that changes over time. Always treat state as immutable.

#### Basic & Objects
```tsx
import { useState } from 'react';

interface User {
  name: string;
  age: number;
}

function UserProfile() {
  // 1. Declare
  const [user, setUser] = useState<User>({ name: 'John', age: 30 });

  const updateAge = () => {
    // 2. Update (Create a copy, modify, then set)
    setUser({ ...user, age: user.age + 1 });
  };

  return <button onClick={updateAge}>Age: {user.age}</button>;
}
```

#### Arrays
Always create a new array using the spread operator `...` when adding or removing items.

```tsx
const [items, setItems] = useState<string[]>(['Apple']);

const addItem = () => {
  // CORRECT: Create new array
  setItems([...items, 'Banana']);
};
```

### Effects (useEffect)
Handles side effects like data fetching, subscriptions, or manual DOM changes.

```tsx
import { useEffect, useState } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Logic to run (Mount + Update)
    const interval = setInterval(() => setCount(c => c + 1), 1000);

    // Cleanup function (Unmount)
    return () => clearInterval(interval);
  }, []); // Dependency Array: [] = Run once on mount
}
```

**Dependency Array Rules:**
*   `[]`: Runs once (ComponentDidMount).
*   `[prop]`: Runs when prop changes.
*   No Array: Runs after every render (Avoid this).

### Custom Hooks
Extract reusable logic into functions starting with `use`.

```tsx
// hooks/useFetch.ts
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, [url]);

  return data;
}
```

---

## Part 2: Next.js 16 Architecture (App Router)

### Core File Structure
Next.js uses a file-system based router where folders define routes.

| File | Purpose | Context |
| :--- | :--- | :--- |
| `app/page.tsx` | The UI for a URL path. | Server Component |
| `app/layout.tsx` | Shared UI (Nav, Footer) wraps children. | Server Component |
| `app/loading.tsx` | Instant loading skeleton (Suspense). | Client/Server |
| `app/error.tsx` | Error boundary for crashes. | Client Component |
| `app/not-found.tsx` | Custom 404 UI. | Server Component |

### Dynamic Routes
Folder name in brackets `[id]` creates a variable parameter. In Next.js 15/16, params are Promises.

**File:** `app/songs/[id]/page.tsx`
```tsx
export default async function SongDetail(props: { params: Promise<{ id: string }> }) {
  const params = await props.params; // Must await in Next.js 15+
  const songId = params.id;

  return <h1>Song ID: {songId}</h1>;
}
```

### Server Actions ("The Backend")
Replace API routes with functions that run on the server, callable directly from UI.

**File:** `actions/authActions.ts`
```ts
"use server"; // 👈 Mandatory directive

import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  // ... Database logic ...

  if (!email) return { error: "Email required" };

  redirect("/dashboard");
}
```

### Client Forms (React 19)
Use `useActionState` (formerly `useFormState`) to handle Server Action results and loading states.

**File:** `app/auth/login/page.tsx`
```tsx
"use client";

import { useActionState } from "react";
import { login } from "@/actions/authActions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <form action={formAction}>
      <input name="email" />
      <button disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

---

## Part 3: Essential Next.js Features (Often Missed)

### 1. Image Optimization (next/image)
Automatically resizes, compresses, and lazy-loads images to prevent layout shift.

```tsx
import Image from "next/image";

// Local image (auto width/height)
import logo from "./logo.png";

export default function Hero() {
  return (
    <>
      {/* Remote Image: Width/Height required */}
      <Image
        src="https://example.com/cover.jpg"
        alt="Album Cover"
        width={500}
        height={500}
        priority // Add for LCP (Largest Contentful Paint) elements (above fold)
      />

      {/* Local Image */}
      <Image src={logo} alt="Logo" placeholder="blur" />
    </>
  );
}
```

### 2. Fonts (next/font)
Optimizes fonts (Google Fonts or local) by downloading them at build time. No layout shift.

**File:** `app/layout.tsx`
```tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### 3. Metadata (SEO)
Replace `<head>` tags with the Metadata API.

**Static Metadata (layout.tsx or page.tsx)**
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spotifi - AI Music",
  description: "Listen to generated tracks.",
};
```

**Dynamic Metadata (e.g., specific song page)**
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const id = (await params).id;
  const song = await getSong(id);

  return {
    title: `${song.title} | Spotifi`,
  };
}
```

### 4. Revalidation (Caching Strategy)
Next.js caches data aggressively. Use `revalidatePath` to purge cache after a mutation (like adding a song or buying credits).

**File:** `actions/storeActions.ts`
```ts
"use server";

import { revalidatePath } from "next/cache";

export async function buySong(songId: string) {
  await db.purchase(songId);

  // ⚡️ Tells Next.js to refresh the data on this route
  revalidatePath("/songs");
  revalidatePath(`/songs/${songId}`);
}
```

### 5. Middleware (Proxy)
Runs before a request completes. Useful for checking auth cookies.

**File:** `middleware.ts` (or `src/proxy.ts` in your specific setup)
```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```
