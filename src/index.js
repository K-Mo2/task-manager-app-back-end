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
    .then((data) => res.status(200).send(data))
    .catch((error) => res.status(400).send(error));
});
