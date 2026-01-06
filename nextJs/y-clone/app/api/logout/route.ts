import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete("username");
    return NextResponse.redirect(new URL("/login", "http://localhost:3000"));
}