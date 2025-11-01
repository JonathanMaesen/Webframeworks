
# React Cheatsheet

This cheatsheet provides a quick reference for common React concepts and practices.

## Project Setup

### Slow Start (Interactive)

Use this command to set up a new Vite project with an interactive prompt that lets you choose your template (e.g., React, Vue, etc.) and language (e.g., TypeScript, JavaScript).

```bash
npm create vite@latest
```

### Quick Start (Non-Interactive)

This command creates a new React project with TypeScript without the interactive prompts.

```bash
npm create vite@latest our-first-react-app -- --template react-ts
```

### Project with Styling (Shadcn UI)

This command sets up a new React project with Vite and Shadcn UI, a beautifully designed component library.

```bash
npx degit similonap/vite-template-react-shadcn react-vite-shadcn
```

### Quick React Project Setup

This command provides a fast way to create a new web project with a pre-configured template.

```bash
npx create-webftemplate my-app
```

### Running the Development Server

Once your project is created, navigate into the project directory and run this command to start the development server:

```bash
npm run dev
```

## Core Concepts

### Components

Components are the building blocks of React applications. They are reusable, self-contained pieces of UI. Components can be either functions or classes.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Props

Props (short for properties) are used to pass data from a parent component to a child component. Props are read-only.

```jsx
<Welcome name="Sara" />
```

### JSX

JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.

```jsx
const element = <h1>Hello, world!</h1>;
```

### Handling Events

Handling events in React is similar to handling events in HTML, but with a few key differences:
- React events are named using camelCase (e.g., `onClick` instead of `onclick`).
- You pass a function as the event handler, rather than a string.

```jsx
function ActionButton() {
  function handleClick() {
    alert('Button clicked!');
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

## State Management

State is used to manage data that changes over time in a component.

### Declaring State

Use the `useState` hook to declare a state variable.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  // ...
}
```

### Updating State

When updating state, especially for objects and arrays, always create a copy of the state variable before making changes. Then, pass the copy to the setter function.

#### Updating Objects in State

```jsx
const [user, setUser] = useState({ name: 'John', age: 30 });

const handleAgeChange = () => {
  const newUser = { ...user, age: user.age + 1 }; // Create a copy
  setUser(newUser); // Pass the copy to the setter
};
```

#### Updating Arrays in State

When working with arrays in state, it's important to create a new array instead of modifying the existing one directly. The spread operator (`...`) is a concise way to do this.

**Adding an Item to an Array**

```jsx
const [items, setItems] = useState(['Apple', 'Banana']);

const handleAddItem = () => {
  // Create a new array with the existing items and add the new one
  setItems([...items, 'Cherry']); 
};
```

This creates a new array containing all the elements of the original `items` array, plus the new item 'Cherry', and then updates the state with this new array.


### Controlled Components

Input fields in React should always be "controlled," meaning their values are tied to a state variable. The `onChange` event is used to update the state as the user types.

```jsx
const [name, setName] = useState('');

<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

### Lifting State Up

When multiple components need to share and react to the same state, it's a common practice to lift that state up to their closest common ancestor. The parent component then passes the state down to the children via props, and the children can notify the parent of any changes by calling functions passed down from the parent.

**Example:**

Imagine a parent component with two child components: one to display a value and another to update it.

```jsx
// Child component to display the value
function Display({ value }) {
  return <p>The value is: {value}</p>;
}

// Child component to update the value
function Updater({ onUpdate }) {
  return <button onClick={() => onUpdate(Math.random())}>Update Value</button>;
}

// Parent component that owns the state
function Parent() {
  const [value, setValue] = useState(0);

  const handleUpdate = (newValue) => {
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

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```

### Logical `&&` Operator

For simpler conditional rendering, you can use the logical `&&` operator. The expression after `&&` will only be rendered if the condition is `true`.

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
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

## Working with Lists

These are common array methods you'll use when working with lists of data in React.

### `map()`

The `map()` method creates a new array by calling a function on every element of the original array. It's commonly used to render lists of components.

**Example 1: Rendering a simple list of strings**

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));

// Usage in a component:
// <ul>{listItems}</ul>
```

**Example 2: Rendering a list of components from an array of objects**

```jsx
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const userList = users.map(user => (
  <li key={user.id}>{user.name}</li>
));

// Renders as:
// <ul>
//   <li>Alice</li>
//   <li>Bob</li>
//   <li>Charlie</li>
// </ul>
```

### `filter()`

The `filter()` method creates a new array with all elements that pass the test implemented by the provided function.

```jsx
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
// result: ["exuberant", "destruction", "present"]
```

### `reduce()`

The `reduce()` method executes a reducer function on each element of the array, resulting in a single output value.

```jsx
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// sum: 10
```

### `sort()`

The `sort()` method sorts the elements of an array in place and returns the sorted array.

```jsx
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
// months: ["Dec", "Feb", "Jan", "March"]
```

### `find()`

The `find()` method returns the first element in the array that satisfies the provided testing function.

**Example 1: Finding a number**

```jsx
const numbers = [5, 12, 8, 130, 44];
const found = numbers.find(element => element > 10);
// found: 12
```

**Example 2: Finding an object in an array by one of its properties**

```jsx
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
];

const user = users.find(user => user.id === 2);
// user will be: { id: 2, name: 'Bob', age: 30 }
```

### Combining `map()` and `find()`

A common pattern is to render a list of items (`map()`) and also have a way to display details for a single selected item (`find()`).

```jsx
const products = [
  { id: 'p1', name: 'Laptop', price: 1200 },
  { id: 'p2', name: 'Mouse', price: 25 },
  { id: 'p3', name: 'Keyboard', price: 75 }
];

function ProductList({ selectedProductId }) {
  // Find the selected product to display its details
  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {/* Map over the products to create a list */}
        {products.map(product => (
          <li key={product.id}>
            {product.name}
          </li>
        ))}
      </ul>

      <hr />

      {/* Display details of the selected product */}
      {selectedProduct && (
        <div>
          <h3>Selected Product:</h3>
          <p>Name: {selectedProduct.name}</p>
          <p>Price: ${selectedProduct.price}</p>
        </div>
      )}
    </div>
  );
}

// Usage:
// <ProductList selectedProductId="p2" />
```

## Effects

Effects let you run side effects in your components, such as fetching data, subscribing to a service, or manually changing the DOM. The `useEffect` hook is used to manage effects.

### Basic Usage

By default, effects run after every completed render.

```jsx
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

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

```jsx
useEffect(() => {
  // This runs only once after the initial render
  console.log('Component mounted');
}, []); // Empty dependency array
```

#### Running an Effect When Dependencies Change

To re-run an effect only when specific values (props or state) have changed, include them in the dependency array.

```jsx
const [name, setName] = useState('John');

useEffect(() => {
  // This effect runs whenever the 'name' state changes
  console.log(`The name is now ${name}`);
}, [name]); // Dependency array with 'name'
```

### Cleaning Up an Effect

Some effects need cleanup, like unsubscribing from a data source or clearing a timer. To do this, return a function from your effect. React will run this cleanup function before the component unmounts and before re-running the effect due to a dependency change.

```jsx
useEffect(() => {
  const timerId = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // Return a cleanup function
  return () => {
    console.log('Clearing the interval');
    clearInterval(timerId);
  };
}, []); // Empty array means this effect runs once, and cleanup runs on unmount
```

## Context

Context provides a way to pass data through the component tree without having to pass props down manually at every level. It's a good way to manage global data like themes, user authentication, or language settings.

### Creating a Context

Create a new folder (e.g., `src/context`) and a new file (e.g., `src/context/ThemeContext.js`) to define your context.

```jsx
// src/context/ThemeContext.js
import { createContext } from 'react';

export const ThemeContext = createContext('light');
```

### Providing a Context

Wrap your component tree with the context provider and provide a value.

```jsx
// src/App.js
import { ThemeContext } from './context/ThemeContext';
import Toolbar from './Toolbar';

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

### Consuming a Context

Use the `useContext` hook to consume the context value in a child component.

```jsx
// src/Toolbar.js
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}
```

## Advanced Routing with React Router

This example demonstrates a more complex routing setup with nested layouts, dynamic routes, and search parameters.

### Installation

First, add `react-router-dom` to your project:

```bash
npm install react-router-dom
```

### 1. Setting Up the Main Router

Wrap your application with `BrowserRouter` in your main entry file.

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### 2. Creating a Layout Component

A layout component provides a shared structure for your pages (e.g., a navbar and footer). The `Outlet` component from React Router is used to render the child routes.

```jsx
// src/components/Layout.jsx
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </nav>
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

### 3. Defining the Routes

In your `App` component, define the routing structure. Here, we nest the `Home`, `Users`, and `UserProfile` routes inside the `Layout` route. This means they will all share the `Layout` component's structure.

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}
```

### 4. Dynamic Routes and URL Parameters

The route `path="users/:userId"` is a **dynamic route**. The `:userId` part is a URL parameter. You can access its value in the `UserProfile` component using the `useParams` hook.

```jsx
// src/pages/UserProfile.jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  return <h2>User Profile for User ID: {userId}</h2>;
}
```

If you navigate to `/users/123`, `userId` will be `"123"`.

### 5. Search Parameters

Search parameters (or query strings) are used to pass optional data in the URL (e.g., `/users?sort=name`). You can read and modify them with the `useSearchParams` hook.

```jsx
// src/pages/Users.jsx
import { Link, useSearchParams } from 'react-router-dom';

function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get('sort') || 'asc';

  const toggleSortOrder = () => {
    setSearchParams({ sort: sortOrder === 'asc' ? 'desc' : 'asc' });
  };

  return (
    <div>
      <h2>Users</h2>
      <button onClick={toggleSortOrder}>
        Sort Order: {sortOrder.toUpperCase()}
      </button>
      <ul>
        <li><Link to="/users/1">User 1</Link></li>
        <li><Link to="/users/2">User 2</Link></li>
        <li><Link to="/users/3">User 3</Link></li>
      </ul>
    </div>
  );
}
```

This component reads the `sort` parameter from the URL. Clicking the button updates the URL to `/users?sort=desc` (or `asc`), demonstrating how to programmatically change search parameters.
