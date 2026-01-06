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
