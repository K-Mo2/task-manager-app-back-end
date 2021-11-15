const userSchema = require("../models/users");
const { main } = require("../database/mongoose");
const express = require("express");

const router = new express.Router();

router.get("/users", async (req, res) => {
  try {
    const objInstance = await main("users", userSchema);
    const result = await objInstance.find();
    !result ? new Error("Error") : res.status(201).send(result);
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/users", async (req, res) => {
  try {
    const objInstance = await main("users", userSchema, req.body);
    const result = await objInstance.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(404).send(error);

    throw new Error(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const objInstance = await main("users", userSchema);
    const result = await objInstance.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!result) {
      return res.status(404).send("Failed to login");
    }

    res.status(201).send(result);
  } catch (error) {
    return res.status(404).send(new Error(error));
  }
});

router.patch("/users/:userId", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "password"];
  const updateIsAllowed = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!updateIsAllowed) {
    return res.status(400).send("Error: Invalid update");
  }

  try {
    const id = req.params.userId;
    const modelInstance = await main("users", userSchema);
    const result = await modelInstance.findById(id);
    updates.forEach((update) => (result[update] = req.body[update]));
    !result ? new Error() : res.status(201).send(result);
  } catch (error) {
    throw new Error(error);
  }
});

router.delete("/users", async (req, res) => {
  try {
    const modelInstance = await main("users", userSchema);
    const result = await modelInstance.findOneAndDelete(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(404).send(error);
    throw new Error(error);
  }
});

module.exports = router;
