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

app.get("/users", (req, res) => {
  main("users", userSchema).then((data) => {
    data
      .find({})
      .then((result) => {
        if (!result) {
          res.status(500).send("Error");
        } else {
          res.status(201).send(result);
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
    throw new Error("Error:failed to fetch");
  });
});

app.post("/users", (req, res) => {
  main("users", userSchema, req.body)
    .then((data) => {
      data.save();
      res.status(201).send(data);
    })
    .catch((error) => res.status(400).send(error));
});

app.post("/tasks", (req, res) => {
  main("tasks", taskSchema, req.body)
    .then((data) => {
      data.save();
      res.status(201).send(data);
    })
    .catch((error) => res.status(400).send(error));
});
