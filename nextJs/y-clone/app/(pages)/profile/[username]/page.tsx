import { getProfileByUsername, getPostsByUsername } from "@/utils/db";
import PostItem from "@/Components/PostItem/PostItem";
import ProfileHeader from "@/Components/ProfileHeader/ProfileHeader";
import { notFound } from "next/navigation";
import { Post, Profile } from "@/utils/interfaces/interfaces";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

    const decodedUsername = decodeURIComponent(username);
    
    let profileData;
    try {
        profileData = await getProfileByUsername(decodedUsername);
    } catch (e) {
        notFound();
    }

    const { posts } = await getPostsByUsername(decodedUsername, "newest", 1);

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
            <ProfileHeader profile={serializedProfile} />

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