import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://nextAdmin:next111@cluster0.b4d8r.mongodb.net/gatherings?retryWrites=true&w=majority"
    );
    const db = client.db();

    const gatheringCollection = db.collection("all-gathering");

    const feedback = await gatheringCollection.insertOne(data);

    console.log(feedback);

    client.close();

    res.status(201).json({ message: "Gathering inserted" });
  }
};

export default handler;
