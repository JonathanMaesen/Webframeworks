"use client"
import { Post } from "@/utils/interfaces/interfaces";
import { useState } from "react";
import Link from "next/link";

export default function PostItem({ post }: { post: Post }) {

    const [liked, setLiked] = useState(false);

    const handleLike = (e : React.MouseEvent) => {
        e.stopPropagation()
        setLiked(!liked);
    };

    return (
        <article className="flex gap-4 p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
            <div className="shrink-0">
                <Link href={`/profile/${post.username}`} onClick={(e) => e.stopPropagation()}>
                    <img
                        src={post.profile?.avatarUrl}
                        alt={post.profile?.name || post.username}
                        className="w-12 h-12 rounded-full object-cover shadow-sm hover:opacity-80 transition-opacity"
                    />
                </Link>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-sm mb-1 leading-tight">
                    <Link href={`/profile/${post.username}`} onClick={(e) => e.stopPropagation()} className="hover:underline">
                        <span className="font-bold text-gray-900 truncate">
                            {post.profile?.name || post.name}
                        </span>
                    </Link>
                    <Link href={`/profile/${post.username}`} onClick={(e) => e.stopPropagation()} className="hover:underline">
                        <span className="text-gray-500 truncate">
                            @{post.username}
                        </span>
                    </Link>
                    <span className="text-gray-400 text-xs">•</span>
                </div>

                <p className="text-gray-900 mb-3 truncate">
                    {post.text}
                </p>

                <button
                    onClick={handleLike}
                    className={`text-sm font-bold transition-colors duration-200 
                    ${liked ? "text-green-600" : "text-gray-400 hover:text-green-500"}`}
                >
                    {liked ? "Liked" : "Like"}
                </button>
            </div>
        </article>
    );
}