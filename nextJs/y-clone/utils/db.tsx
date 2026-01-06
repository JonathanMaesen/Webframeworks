import { Collection, MongoClient, ObjectId, Sort } from "mongodb";
import {Post, Profile} from "@/utils/interfaces/interfaces";

const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017");

export const postsCollection: Collection<Post> = client.db("y-clone").collection<Post>("post");
export const profilesCollection: Collection<Profile> = client.db("y-clone").collection<Profile>("profiles");

const PAGE_SIZE = 5;

export const seedDatabase = async () => {
    await postsCollection.deleteMany({});
    await profilesCollection.deleteMany({});

    const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/y-clone/profiles.json");
    if (!response.ok) {
        throw new Error("Fetching profiles went wrong")
    }
    const profiles = await response.json() as Profile[];

    await profilesCollection.insertMany(profiles);

    const responsePosts = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/y-clone/posts.json");
    if (!responsePosts.ok) {
        throw new Error("Fetching posts went wrong")
    }
    let posts = await responsePosts.json() as Post[];

    posts = posts.map(post => ({ ...post, likes: Math.floor(Math.random() * 100) }));

    await postsCollection.insertMany(posts);

    const postsFromDb = await postsCollection.find().toArray();
    console.log("Seeded posts:", postsFromDb);
    const profilesFromDb = await profilesCollection.find().toArray();
    console.log("Seeded profiles:", profilesFromDb);

    return { posts: postsFromDb, profiles: profilesFromDb };
}

export const getProfileByUsername = async (username: string) => {
    //@ts-ignore
    const profile = await profilesCollection.findOne({ username: username });

    if (!profile) {
        throw new Error("Profile not found");
    }

    return profile;
}

export const getPostsByUsername = async (username: string, sort: string = "newest", page: number = 1) => {
    let sortObject: Sort = { createdOn: -1 };
    if (sort === "oldest") {
        sortObject = { createdOn: 1 };
    } else if (sort === "most_liked") {
        sortObject = { likes: -1 };
    }
    //@ts-ignore
    let posts = await postsCollection.find({ username: username }).sort(sortObject).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).toArray();
    const profile = await getProfileByUsername(username);

    posts = posts.map(post => {
        return {
            ...post,
            profile: profile
        } as Post;
    });

    const totalPosts = await postsCollection.countDocuments({ username: username });
    const pages = Math.ceil(totalPosts / PAGE_SIZE);

    return { posts, pages };
}

export const getPosts = async (q: string = "", sort: string = "newest", page: number = 1) => {
    let sortObject: Sort = { createdOn: -1 };
    if (sort === "oldest") {
        sortObject = { createdOn: 1 };
    } else if (sort === "most_liked") {
        sortObject = { likes: -1 };
    }

    const query = {
        $or: [
            { text: new RegExp(q, "i") },
            { username: new RegExp(q, "i") },
            { name: new RegExp(q, "i") }
        ]
    };

    //@ts-ignore
    let posts = await postsCollection.find(query).sort(sortObject).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).toArray();
    let profiles = await profilesCollection.find().toArray();

    posts = posts.map(post => {
        return {
            ...post,
            profile: profiles.find(p => p.username === post.username)
        } as Post;
    });

    const totalPosts = await postsCollection.countDocuments(query);
    const pages = Math.ceil(totalPosts / PAGE_SIZE);


    return { posts, pages };
}

export const getPostById = async (id: string) => {
    //@ts-ignore
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });
    if (!post) {
        return null;
    }
    const profile = await getProfileByUsername(post.username);
    return {
        ...post,
        profile
    } as Post;
}

export const createPost = async (text: string, username: string) => {
    const profile = await getProfileByUsername(username);
    const post: Post = {
        name: profile.name,
        username: username,
        text: text,
        createdOn: new Date().toISOString(),
        likes: 0
    };
    await postsCollection.insertOne(post);
}

export const updatePostLikes = async (id: string, increment: number) => {
    await postsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { likes: increment } }
    );
}
