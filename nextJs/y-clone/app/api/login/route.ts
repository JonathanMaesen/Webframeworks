import { profilesCollection } from "@/utils/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
        }

        //@ts-ignore
        const user = await profilesCollection.findOne({ username, password });

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const cookieStore = await cookies();
        cookieStore.set("username", username, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}