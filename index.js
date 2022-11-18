const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const taskRoute = require("./routes/task");
require("dotenv").config();

app.use(express.json());
app.use("/api/v1/tasks", taskRoute);
app.use(express.static("./public"));
app.use("./error/error");

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("server is listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
