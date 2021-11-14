const express = require("express");
require("./database/mongoose");
const userSchema = require("./models/users");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("http://localhost:" + port);
});

app.use(express.json());

app.post("/users", (req, res) => {
  res.send("testing");
});
