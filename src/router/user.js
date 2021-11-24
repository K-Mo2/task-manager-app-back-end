const userSchema = require("../models/users");
const { main } = require("../database/mongoose");
const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");

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

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "password", "name", "age"];
  const isValidUpdate = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidUpdate) {
    return res.status(400).send("Error: Invalid update");
  }

  try {
    req.user.email = req.body.email;
    req.user.password = req.body.password;
    await req.user.save();
    res.status(201).send(req.user);
  } catch (error) {
    res.status(404).send(error);
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
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(404).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const modelInstance = await main("users", userSchema);
    const user = await modelInstance.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send({ error: e });
  }
});
module.exports = router;
