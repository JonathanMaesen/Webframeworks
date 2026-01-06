import { updatePostLikes } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { increment } = body;

        if (typeof increment !== 'number') {
            return NextResponse.json({ error: "Increment value is required and must be a number" }, { status: 400 });
        }

        await updatePostLikes(id, increment);

        return NextResponse.json({ message: "Likes updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating likes:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}