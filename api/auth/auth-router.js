const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')
const router = require("express").Router();
const { jwtSecret } = require('../../config/secrets.js')
const Users = require("../users/users-model.js")

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (Users.isValidRegister(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide name, email, and password",
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (Users.isValidLogin(req.body)) {
    Users.findBy({ email: email })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password) || password === user.password) {
          const token = generateToken(user)
          res.status(200).json({ message: "Welcome to our API", token, id: user.id });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide email and password",
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    name: user.name,
    permission: user.permission,
  }
  const options = {
    expiresIn: 5000,
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;