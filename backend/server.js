const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://zeft:Zeft1135@cluster0.zarxd.gcp.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const ordersRouter = require("./orders.route");

app.use("/orders", ordersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: localhost:${port}`);
});
