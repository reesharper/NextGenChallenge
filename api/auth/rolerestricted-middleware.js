module.exports = role => (req, res, next) => {
  if (req.decodedJwt && req.decodedJwt.permission === permission) {
    next()
  } else {
    res.status(403).json('Only admins may access this')
  }
}