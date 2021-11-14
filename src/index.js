const express = require("express");
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
