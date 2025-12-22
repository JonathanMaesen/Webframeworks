import { Post, Profile } from "@/utils/interfaces/interfaces"; // Adjust path as needed

export default function joinPostsWithProfiles(allPosts: Post[], allProfiles: Profile[]): Post[] {
    return allPosts.map((singlePost) => {

        const matchingProfile = allProfiles.find(
            (profile) => profile.username === singlePost.username
        );
        return {
            ...singlePost,
            profile: matchingProfile
        };
    });
}