import { User } from '../types'
import { getDb } from "../client";
import { getNextSequence } from "../counters";

async function getUsersCollection() {
    const db = await getDb();
    return db.collection<User>("users");
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const collection = await getUsersCollection();
    return await collection.findOne({ email });
}

export const findUserById = async (id: number): Promise<User | null> => {
    const collection = await getUsersCollection();
    return await collection.findOne({id});
}

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
    const collection = await getUsersCollection();
    // Use atomic counter for ID generation to prevent race conditions
    const newId = await getNextSequence("userid");
    const userWithId: User = { id: newId, ...user };
    await collection.insertOne(userWithId);
    return userWithId;
}

export const updateUser = async (id: number, updates: Partial<User>): Promise<void> => {
    const collection = await getUsersCollection();
    await collection.updateOne({ id }, { $set: updates });
}