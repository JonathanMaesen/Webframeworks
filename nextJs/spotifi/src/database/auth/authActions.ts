"use server";

import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createUser, findUserByEmail } from "./auth";
import bcrypt from 'bcrypt';

interface LoginState {
    errors: {
        email: string[];
        password: string[];
        general: string[];
    };
    email: string;
    success: boolean;
}

interface RegisterState {
    errors: {
        email: string[];
        password: string[];
        name: string[];
        general: string[];
    };
    email: string;
    name: string;
    success: boolean;
}

function validateEmail(email: string): string[] {
    if (!email) return ["Email is required"];
    if (!email.includes("@")) return ["Invalid email address"];
    return [];
}

function validatePassword(password: string): string[] {
    if (!password) return ["Password is required"];
    if (password.length < 6) return ["Password must be at least 6 characters"];
    return [];
}

function validateName(name: string): string[] {
    if (!name) return ["Name is required"];
    if (name.length < 2) return ["Name must be at least 2 characters"];
    return [];
}

export const login = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
    let email = formData.get("email")?.toString() ?? "";
    let password = formData.get("password")?.toString() ?? "";

    let emailErrors: string[] = validateEmail(email);
    let passwordErrors: string[] = validatePassword(password);

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
        return {
            errors: {
                email: emailErrors,
                password: passwordErrors,
                general: []
            },
            email: email,
            success: false
        }
    }

    const user = await findUserByEmail(email);

    if (!user) {
        return {
            errors: {
                general: ["Invalid email or password"],
                email: [],
                password: []
            },
            email: email,
            success: false
        }
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
        return {
            errors: {
                general: ["Invalid email or password"],
                email: [],
                password: []
            },
            email: email,
            success: false
        }
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1h"
        }
    );

    const cookieStore = await cookies();

    cookieStore.set({
        name: "jwt",
        value: token,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
    });

    redirect("/home");
}

export const register = async (prevState: RegisterState, formData: FormData): Promise<RegisterState> => {
    let email = formData.get("email")?.toString() ?? "";
    let password = formData.get("password")?.toString() ?? "";
    let name = formData.get("name")?.toString() ?? "";

    let emailErrors = validateEmail(email);
    let passwordErrors = validatePassword(password);
    let nameErrors = validateName(name);

    if (emailErrors.length > 0 || passwordErrors.length > 0 || nameErrors.length > 0) {
        return {
            errors: {
                email: emailErrors,
                password: passwordErrors,
                name: nameErrors,
                general: []
            },
            email,
            name,
            success: false
        }
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return {
            errors: {
                email: ["Email already in use"],
                password: [],
                name: [],
                general: []
            },
            email,
            name,
            success: false
        }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await createUser({
        email,
        name,
        passwordHash,
        credits: 0,
        avatar: "",
        library: []
    });

    const token = jwt.sign(
        {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            avatar: newUser.avatar
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1h"
        }
    );

    const cookieStore = await cookies();

    cookieStore.set({
        name: "jwt",
        value: token,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
    });

    redirect("/home");
}

export const logout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("jwt");
    redirect("/login");
}