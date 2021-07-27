const express = require('express');
const router = express.Router();

const User = require('./users-model')
// const restricted = require("../auth/restricted-middleware.js");
// const restrictRole = require('../auth/rolerestricted-middleware.js')


router.get("/", (req, res) => {
  User.get()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get("/:id", (req, res) => {
  User.getById(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.send(err));
});

router.post('/', (req, res, next) => {
  User.findBy(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      next(error)
    })
});

router.delete('/:id', (req, res, next) => {
  User.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "the user has been deleted" })
    })
    .catch(error => {
      next(error)
    })
});

router.put('/:id', (req, res, next) => {
  User.update(req.params.id, req.body)
    .then(() => {
      res.status(200).json(req.body)
    })
    .catch(error => {
      next(error)
    })
});

router.use((error, req, res) => {
  res.status(500).json({
    info: 'something horrible happened inside the user router',
    message: error.message,
    stack: error.stack,
  })
})

module.exports = router;