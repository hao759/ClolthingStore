const express = require("express");
const app = express();
const route = require("./routes/");
const db = require("./config/db");
const path = require("path");
// let cors = require("cors");
// app.use(cors());
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const cloudinary = require("cloudinary").v2;
// var bodyParser = require("body-parser");
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
console.log("====" + path.dirname(__dirname) + "==");
// app.use("/public", express.static(path.join(__dirname, "upload")));
app.use("/public", express.static(__dirname + "/public"));
app.set("views", __dirname + "/app/views");
app.set("view engine", "ejs");
// route(app);
app.use(route);
db.connect();

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
