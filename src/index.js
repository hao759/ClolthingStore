const express = require("express");
const app = express();

const route = require("./routes/");
const db = require("./config/db");
// const path = require("path");
// let cors = require("cors");
// app.use(cors());
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

// app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use("/public", express.static(path.join(__dirname, "upload")));

// route(app);
app.use(route);
db.connect();

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
