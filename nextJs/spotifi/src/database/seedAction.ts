"use server";

import { seedSongs } from "./songs";
import { revalidatePath } from "next/cache";

export async function seedDatabase() {
    try {
        await seedSongs();
        revalidatePath("/home"); // Refresh the home page to show new data
        return { success: true, message: "Database seeded successfully!" };
    } catch (error) {
        console.error("Failed to seed database:", error);
        return { success: false, message: "Failed to seed database." };
    }
}