const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 6060;
const app = express();
const ObjectId = require("mongodb").ObjectId;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.alsquch.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const medicineCollection = client
      .db("support-for-tomorrow")
      .collection("medicineInfo");

    app.post("/medicine", async (req, res) => {
      const newMedicine = req.body;
      const result = await medicineCollection.insertOne(newMedicine);
      res.send(result);
    });

    app.get("/medicine", async (req, res) => {
      const result = await medicineCollection.find().toArray();
      res.send(result);
    });

    app.get("/medicineone", async (req, res) => {
      booth = "Booth-1";
      const filter = { booth: booth };
      const result = await medicineCollection.find(filter).toArray();
      res.send(result);
    });

    app.get("/medicinetwo", async (req, res) => {
      booth = "Booth-2";
      const filter = { booth: booth };
      const result = await medicineCollection.find(filter).toArray();
      res.send(result);
    });

    app.put("/medicine/:_id", async (req, res) => {
      const _id = req.params._id;
      const filter = { _id: new ObjectId(_id) };
      const updateDoc = {
        $set: { status: "accepted" },
      };
      const result = await medicineCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.delete("/medicine/:_id", async (req, res) => {
      const _id = req.params._id;
      const filter = { _id: new ObjectId(_id) };
      const result = await medicineCollection.deleteOne(filter);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Support server is running");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
