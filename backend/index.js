const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/db-config");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server started at port ", port);
});
