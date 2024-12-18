import { connectToDatabase } from "./db.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { db } = await connectToDatabase();
      const users = await db.collection("users").find({}).toArray();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
