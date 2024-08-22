"use client";

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedClient = null;
let cachedDb = null;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function createUser(data) {
  const { client, db } = await connectToDatabase();
  try {
    const result = await db.collection("users").insertOne(data);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function fetchUserGoals(userId) {
  const { client, db } = await connectToDatabase();
  try {
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      return [];
    }
    return user.goals || [];
  } catch (error) {
    console.error("Error fetching user goals:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function addGoal(userId, data) {
  const { client, db } = await connectToDatabase();
  try {
    const result = await db.collection("users").updateOne(
      { _id: userId },
      {
        $push: {
          goals: data,
        },
      }
    );
    return result;
  } catch (error) {
    console.error("Error adding goal:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function removeGoal(goalId) {
  const { client, db } = await connectToDatabase();
  try {
    const result = await db
      .collection("users")
      .updateOne(
        {},
        {
          $pull: {
            goals: {
              id: goalId,
            },
          },
        }
      );
    return result;
  } catch (error) {
    console.error("Error removing goal:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function fetchUserWorkouts(userId) {
  const { client, db } = await connectToDatabase();
  try {
    const workouts = await db.collection("workouts").find({ userId }).toArray();
    return workouts;
  } catch (error) {
    console.error("Error fetching user workouts:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function addWorkout(userId, data) {
  const { client, db } = await connectToDatabase();
  try {
    const result = await db.collection("workouts").insertOne({ ...data, userId });
    return result;
  } catch (error) {
    console.error("Error adding workout:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function fetchUserPosts(userId) {
  const { client, db } = await connectToDatabase();
  try {
    const posts = await db.collection("posts").find({ userId }).toArray();
    return posts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function addPost(userId, data) {
  const { client, db } = await connectToDatabase();
  try {
    const result = await db.collection("posts").insertOne({ ...data, userId });
    return result;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  } finally {
    await client.close();
  }
}