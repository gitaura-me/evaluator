import { connectToDatabase } from "./db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, feedback } = req.body;

      const { db } = await connectToDatabase();
      await db
        .collection("users")
        .updateOne({ _id: username }, { $set: { feedback } });

      res.status(200).json({ message: "Feedback submitted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error submitting feedback", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
