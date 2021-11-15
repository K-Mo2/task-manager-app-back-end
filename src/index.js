const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("http://localhost:" + port);
});

app.use((req, res, next) => {
  console.log(req.method, req.path);

  if (req.method === "GET") {
    res.status(503).send("maintenance mode");
  }
  res.status(201).send("successful request");
  next();
});

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);

const myFunction = async () => {
  const token = jwt.sign({ _id: "abd123" }, "secret", { expiresIn: "7 days" });
  console.log(token);

  const data = jwt.verify(token, "secret");
  console.log(data);
};
