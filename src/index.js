const express = require("express");
const { main } = require("./database/mongoose");
const userSchema = require("./models/users");
const taskSchema = require("./models/tasks");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("http://localhost:" + port);
});

app.use(express.json());

app.post("/users", (req, res) => {
  main("users", userSchema, req.body)
    .then((data) => res.status(201).send(data))
    .catch((error) => res.status(400).send(error));
});

app.post("/tasks", (req, res) => {
  main("tasks", taskSchema, req.body)
    .then((data) => res.status(201).send(data))
    .catch((error) => res.status(400).send(error));
});
