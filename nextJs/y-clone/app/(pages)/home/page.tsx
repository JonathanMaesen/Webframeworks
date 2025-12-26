import PostList from "@/Components/PostList/PostList";
import { getPosts } from "@/utils/db";
import { Post } from "@/utils/interfaces/interfaces";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;
    const query = typeof params.query === 'string' ? params.query : '';
    const sort = typeof params.sort === 'string' ? params.sort : 'newest';
    const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;

    const { posts, pages } = await getPosts(query, sort, page);

    const serializedPosts: Post[] = posts.map(post => ({
        ...post,
        _id: post._id?.toString(),
        profile: post.profile ? {
            ...post.profile,
            _id: post.profile._id?.toString()
        } : undefined
    }));

    return (
        <Suspense fallback={<Loading />}>
            <PostList posts={serializedPosts} totalPages={pages} />
        </Suspense>
    );
}
