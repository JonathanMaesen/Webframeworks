"use client"
import { Post, Profile } from "@/utils/interfaces/interfaces";
import PostItem from './PostItem'
import useSWR from 'swr';
import joinPostsWithProfiles from "@/utils/helpers/joinPostsWithProfiles";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PostList() {

    const { data: rawProfiles, error: profileError } = useSWR<Profile[]>('https://raw.githubusercontent.com/similonap/json/refs/heads/master/y-clone/profiles.json', fetcher);
    const { data: rawPosts, error: postError } = useSWR<Post[]>('https://raw.githubusercontent.com/similonap/json/refs/heads/master/y-clone/posts.json', fetcher);

    if (!rawProfiles || !rawPosts) return <div>Loading...</div>;
    if (profileError || postError) return <div>Failed to load</div>;

    const mergedData = joinPostsWithProfiles(rawPosts, rawProfiles);

    return(
        <div className="flex flex-col">
            {mergedData.map((tweet, index) => (
                <PostItem key={index} post={tweet} />
            ))}
        </div>
    )
}