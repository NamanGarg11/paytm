const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Mainrouter = require("./routes/main.routes");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/v1",Mainrouter);
module.exports = app;

