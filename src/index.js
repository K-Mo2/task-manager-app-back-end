const express = require("express");
const { main } = require("./database/mongoose");
const userSchema = require("./models/users");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("http://localhost:" + port);
});

app.use(express.json());

app.post("/users", (req, res) => {
  main(req.body)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  res.send(req.body);
});
