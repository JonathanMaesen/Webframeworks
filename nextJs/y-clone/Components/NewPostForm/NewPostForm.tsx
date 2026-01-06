"use client"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function NewPostForm() {
    const router = useRouter();
    const [newPostText, setNewPostText] = useState("");

    const handleCreatePost = async (e: FormEvent) => {
        e.preventDefault();
        if (!newPostText.trim()) return;

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newPostText }),
            });

            if (response.ok) {
                setNewPostText("");
                router.refresh();
            } else {
                console.error("Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="mb-6 p-4 border rounded shadow-sm bg-white">
            <form onSubmit={handleCreatePost} className="flex flex-col gap-2">
                <textarea
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="What's happening?"
                    className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!newPostText.trim()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
}