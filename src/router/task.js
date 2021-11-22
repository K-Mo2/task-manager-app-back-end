const { main } = require("../database/mongoose");
const taskSchema = require("../models/tasks");
const express = require("express");
const auth = require("../middleware/auth");

const router = new express.Router();

router.get("/tasks", auth, (req, res) => {
  main("tasks", taskSchema).then((data) => {
    data.find({ owner: req.user._id }).then((result) => {
      if (!result) {
        res.status(404).send("Not Found");
      }
      res.status(201).send(result);
    });
  });
});

router.post("/tasks", auth, (req, res) => {
  main("tasks", taskSchema, { ...req.body, owner: req.user._id })
    .then((data) => {
      data.save();
      res.status(201).send(data);
    })
    .catch((error) => res.status(400).send(error));
});

router.patch("/tasks/:id", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["task", "completed"];
    const updateIsAllowed = updates.every((update) => {
      return allowedUpdates.includes(update);
    });
    if (!updateIsAllowed) {
      return res.status(400).send("Error: Invalid update");
    }

    const id = req.params.id;
    const modelInstance = await main("tasks", taskSchema);
    const result = await modelInstance.findOne({
      _id: id,
      owner: req.user._id,
    });

    if (!result) {
      res.status(404).send(new Error("Not Found"));
    }

    updates.forEach((update) => (result[update] = req.body[update]));
    await result.save();

    res.status(201).send(result);
  } catch (error) {
    throw new Error(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const modelInstance = await main("tasks", taskSchema);
    const result = await modelInstance.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    !result ? new Error() : res.status(201).send(result);
  } catch (error) {
    res.status(404).send(error);
    throw new Error(error);
  }
});

module.exports = router;
