const userSchema = require("../models/users");
const { main } = require("../database/mongoose");
const express = require("express");
const auth = require("../middleware/auth");

const router = new express.Router();

router.get("/users/me", auth, async (req, res) => {
  res.status(201).send(req.user);
});

router.post("/users/signup", async (req, res) => {
  try {
    const objInstance = await main("users", userSchema, req.body);
    const result = await objInstance.save();
    const token = await result.generateAuthToken();

    res.status(201).send({ result, token });
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
    const token = await result.generateAuthToken();

    if (!result) {
      return res.status(404).send("Failed to login");
    }
    res.status(201).send({ result, token });
  } catch (error) {
    return res.status(404).send(new Error(error));
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
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

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(201).send(req.user);
  } catch (error) {
    res.status(404).send(error);
    throw new Error(error);
  }
});

module.exports = router;
