"use client"
import { Post } from "@/utils/interfaces/interfaces";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostItem({ post }: { post: Post }) {
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes || 0);

    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
        if (likedPosts.includes(post._id)) {
            setLiked(true);
        }
    }, [post._id]);

    const handleLike = async (e : React.MouseEvent) => {
        e.stopPropagation();
        
        const newLikedState = !liked;
        const increment = newLikedState ? 1 : -1;
        
        setLiked(newLikedState);
        setLikesCount(prev => prev + increment);

        // Update localStorage
        const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
        if (newLikedState) {
            if (!likedPosts.includes(post._id)) {
                likedPosts.push(post._id);
            }
        } else {
            const index = likedPosts.indexOf(post._id);
            if (index > -1) {
                likedPosts.splice(index, 1);
            }
        }
        localStorage.setItem("liked_posts", JSON.stringify(likedPosts));

        try {
            const response = await fetch(`/api/posts/${post._id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ increment }),
            });

            if (!response.ok) {
                // Revert optimistic update if request fails
                setLiked(!newLikedState);
                setLikesCount(prev => prev - increment);
                
                // Revert localStorage
                const currentLikedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
                if (newLikedState) {
                     // We added it, so remove it
                    const index = currentLikedPosts.indexOf(post._id);
                    if (index > -1) currentLikedPosts.splice(index, 1);
                } else {
                    // We removed it, so add it back
                    if (!currentLikedPosts.includes(post._id)) currentLikedPosts.push(post._id);
                }
                localStorage.setItem("liked_posts", JSON.stringify(currentLikedPosts));
                
                console.error("Failed to update like");
            } else {
                router.refresh();
            }
        } catch (error) {
            // Revert optimistic update if request fails
            setLiked(!newLikedState);
            setLikesCount(prev => prev - increment);

             // Revert localStorage
             const currentLikedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
             if (newLikedState) {
                  // We added it, so remove it
                 const index = currentLikedPosts.indexOf(post._id);
                 if (index > -1) currentLikedPosts.splice(index, 1);
             } else {
                 // We removed it, so add it back
                 if (!currentLikedPosts.includes(post._id)) currentLikedPosts.push(post._id);
             }
             localStorage.setItem("liked_posts", JSON.stringify(currentLikedPosts));

            console.error("Error updating like:", error);
        }
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

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleLike}
                        className={`text-sm font-bold transition-colors duration-200 
                        ${liked ? "text-green-600" : "text-gray-400 hover:text-green-500"}`}
                    >
                        {liked ? "Liked" : "Like"}
                    </button>
                    <span className="text-sm text-gray-500">
                        {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
                    </span>
                </div>
            </div>
        </article>
    );
}