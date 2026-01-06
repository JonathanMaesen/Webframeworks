import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export interface SessionUser {
    id: number;
    email: string;
    name: string;
    avatar: string;
}

export async function getSession(): Promise<SessionUser | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as SessionUser;
        return decoded;
    } catch (error) {
        // Token is invalid or expired
        return null;
    }
}