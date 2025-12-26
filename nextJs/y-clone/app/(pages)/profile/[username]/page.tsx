import { getProfileByUsername, getPostsByUsername } from "@/utils/db";
import PostItem from "@/Components/PostItem/PostItem";
import { notFound } from "next/navigation";
import { Post, Profile } from "@/utils/interfaces/interfaces";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    
    let profileData;
    try {
        profileData = await getProfileByUsername(username);
    } catch (e) {
        notFound();
    }

    const { posts } = await getPostsByUsername(username, "newest", 1);

    const serializedProfile: Profile = {
        ...profileData,
        _id: profileData._id?.toString()
    };

    const serializedPosts: Post[] = posts.map(post => ({
        ...post,
        _id: post._id?.toString(),
        profile: post.profile ? {
            ...post.profile,
            _id: post.profile._id?.toString()
        } : undefined
    }));

    return (
        <div>
            <div className="relative">
                <div className="h-32 bg-gray-200 overflow-hidden">
                    {serializedProfile.bannerUrl && (
                        <img 
                            src={serializedProfile.bannerUrl} 
                            alt="Banner" 
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="absolute -bottom-12 left-4">
                    <img
                        src={serializedProfile.avatarUrl}
                        alt={serializedProfile.name}
                        className="w-24 h-24 rounded-full border-4 border-white object-cover"
                    />
                </div>
            </div>
            
            <div className="mt-14 px-4">
                <h1 className="text-xl font-bold">{serializedProfile.name}</h1>
                <p className="text-gray-500">@{serializedProfile.username}</p>
                <p className="mt-2">{serializedProfile.bio}</p>
            </div>

            <div className="mt-6 border-t border-gray-200">
                {serializedPosts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
                {serializedPosts.length === 0 && (
                    <p className="p-4 text-gray-500 text-center">No posts yet.</p>
                )}
            </div>
        </div>
    );
}