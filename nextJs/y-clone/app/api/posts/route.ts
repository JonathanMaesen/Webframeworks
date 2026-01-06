import { createPost } from "@/utils/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { text } = body;

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const username = cookieStore.get("username")?.value;

        if (!username) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await createPost(text, username);

        return NextResponse.json({ message: "Post created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}