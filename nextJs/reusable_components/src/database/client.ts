import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (!process.env.MONGODB_URI) {
  // In a real app, you might want to throw an error, 
  // but for the showcase/build process, we can warn or handle it.
  // throw new Error("Please add your Mongo URI to .env");
  console.warn("MONGODB_URI is not defined in .env");
}

if (process.env.NODE_ENV === "development") {
  // In dev, use a global variable to preserve connection across reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export { clientPromise as dbClient };
// Explicitly type the db export to help with type inference
export const db: Db = (await clientPromise).db("spotifi_showcase");
