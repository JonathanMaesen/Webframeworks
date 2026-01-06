import { profilesCollection } from "@/utils/db";
import { NextResponse } from "next/server";
import { Profile } from "@/utils/interfaces/interfaces";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password, name, bio, avatarUrl, bannerUrl } = body;

        if (!username || !password || !name) {
            return NextResponse.json({ error: "Username, password, and name are required" }, { status: 400 });
        }

        //@ts-ignore
        const existingUser = await profilesCollection.findOne({ username });

        if (existingUser) {
            return NextResponse.json({ error: "Username already exists" }, { status: 409 });
        }

        const newProfile: Profile = {
            username,
            password,
            name,
            bio: bio || "",
            avatarUrl: avatarUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
            bannerUrl: bannerUrl || "https://via.placeholder.com/600x200",
        };

        await profilesCollection.insertOne(newProfile);

        return NextResponse.json({ message: "Registration successful" }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}