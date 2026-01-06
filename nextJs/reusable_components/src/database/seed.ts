import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: ".env" });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("Please provide MONGODB_URI in .env file");
  process.exit(1);
}

const client = new MongoClient(uri);

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    const db = client.db("spotifi_showcase");

    console.log("Clearing existing data...");
    await db.collection("users").deleteMany({});
    await db.collection("songs").deleteMany({});

    console.log("Seeding Users...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    const users = [
      {
        name: "Demo User",
        email: "demo@example.com",
        password: hashedPassword,
        createdAt: new Date(),
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        createdAt: new Date(),
      },
    ];
    await db.collection("users").insertMany(users);

    console.log("Seeding Songs...");
    const songs = [
      {
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        duration: 354,
        coverUrl: "https://placehold.co/400",
        createdAt: new Date(),
      },
      {
        title: "Hotel California",
        artist: "Eagles",
        album: "Hotel California",
        duration: 390,
        coverUrl: "https://placehold.co/400",
        createdAt: new Date(),
      },
      {
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        album: "Appetite for Destruction",
        duration: 356,
        coverUrl: "https://placehold.co/400",
        createdAt: new Date(),
      },
      {
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        album: "Nevermind",
        duration: 301,
        coverUrl: "https://placehold.co/400",
        createdAt: new Date(),
      },
      {
        title: "Billie Jean",
        artist: "Michael Jackson",
        album: "Thriller",
        duration: 294,
        coverUrl: "https://placehold.co/400",
        createdAt: new Date(),
      },
      {
        title: "Imagine",
        artist: "John Lennon",
        album: "Imagine",
        duration: 183,
        coverUrl: "https://placehold.co/400",
        createdAt: new Date(),
      },
      {
        title: "Like a Rolling Stone",
        artist: "Bob Dylan",
        album: "Highway 61 Revisited",
        duration: 373,
        coverUrl: "https://placehold.co/400",
        createdAt: new Date(),
      },
      {
        title: "Hey Jude",
        artist: "The Beatles",
        album: "Hey Jude",
        duration: 431,
        coverUrl: "https://placehold.co/400",
        createdAt: new Date(),
      },
      {
        title: "Purple Haze",
        artist: "Jimi Hendrix",
        album: "Are You Experienced",
        duration: 170,
        coverUrl: "https://placehold.co/400",
        createdAt: new Date(),
      },
      {
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        album: "Led Zeppelin IV",
        duration: 482,
        coverUrl: "https://placehold.co/400",
        createdAt: new Date(),
      },
    ];
    await db.collection("songs").insertMany(songs);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
