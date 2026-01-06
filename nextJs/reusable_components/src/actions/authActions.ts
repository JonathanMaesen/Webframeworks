"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/database/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_do_not_use_in_prod";

// Zod Schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export interface ActionState {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function loginAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = Object.fromEntries(formData.entries());
  
  // 1. Validation
  const validated = loginSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validated.data;

  try {
    // 2. Database Lookup
    const user = await db.collection("users").findOne({ email });
    
    if (!user) {
      return { success: false, message: "Invalid credentials" };
    }

    // 3. Password Check
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { success: false, message: "Invalid credentials" };
    }

    // 4. Create Session
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Internal server error" };
  }

  // 5. Redirect (must be outside try/catch)
  redirect("/home");
}

export async function registerAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = Object.fromEntries(formData.entries());

  // 1. Validation
  const validated = registerSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { email, password, name } = validated.data;

  try {
    // 2. Check if user exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return { 
        success: false, 
        message: "User already exists",
        errors: { email: ["Email is already taken"] }
      };
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create User
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    });

    if (!result.acknowledged) {
      return { success: false, message: "Failed to create user" };
    }

    // 5. Create Session (Auto-login)
    const token = jwt.sign(
      { userId: result.insertedId.toString(), email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

  } catch (error) {
    console.error("Register error:", error);
    return { success: false, message: "Internal server error" };
  }

  // 6. Redirect
  redirect("/home");
}
