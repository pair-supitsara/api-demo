require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
// routes
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function startServer() {
  try {
      await mongoose.connect(process.env.MONGO_URI, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log(process.env.MONGO_URI)
      console.log("MongoDB Connected");
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      app.listen(5000, () => {
        console.log("Server running");
      });

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

startServer();