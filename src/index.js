const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("http://localhost:" + port);
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
