const mapUser = require('../helpers/mapUser');
const { register, login } = require("../controllers/user");
const express = require('express');

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (err) {
    res.send({ error: err.message || "Unknown error" });
  }
});

router.post("/login", async (req, res) => {

  try {
    const { user, token } = await login(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (err) {
    res.send({ error: err.message || "Unknown error" });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({ error: null });
});

module.exports = router;
