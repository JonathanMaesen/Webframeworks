"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, name, bio, avatarUrl, bannerUrl }),
            });

            if (response.ok) {
                router.push("/login");
            } else {
                const data = await response.json();
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("An error occurred during registration");
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
                <input
                    type="text"
                    placeholder="Display Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="p-2 border rounded resize-none"
                    rows={3}
                />
                <input
                    type="url"
                    placeholder="Avatar URL"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="url"
                    placeholder="Banner URL"
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                    Register
                </button>
            </form>
            <div className="mt-4 text-center">
                <Link href="/login" className="text-blue-500 hover:underline">
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
}