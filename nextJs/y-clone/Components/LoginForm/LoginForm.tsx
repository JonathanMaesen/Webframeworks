"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                router.push("/home");
            } else {
                const data = await response.json();
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("An error occurred during login");
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
            <div className="mt-4 text-center">
                <Link href="/register" className="text-blue-500 hover:underline">
                    Don't have an account? Register
                </Link>
            </div>
        </div>
    );
}