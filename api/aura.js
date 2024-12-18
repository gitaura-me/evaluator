import { ObjectId } from "mongodb";

import { connectToDatabase } from "./db.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { user_id, aura } = req.body;
      console.log(user_id, aura);

      const { db } = await connectToDatabase();
      const user = await db.collection("users").findOne({ _id: new ObjectId(user_id) });
      console.log(user);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await db
        .collection("users")
        .updateOne({ _id: new ObjectId(user_id) }, { $set: { aura: Number(aura) } });

      res.status(200).json({ message: "Feedback submitted" });
    } catch (error) {
      res.status(500).json({ message: "Error submitting feedback", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
