const db = require('../../data/dbConfig.js');

module.exports = {
  get,
  getById,
  findBy,
  add,
  update,
  remove,
  isValidRegister,
  isValidLogin
};

function get() {
  return db('users');
}

function getById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users as u")
    .join("permission as p", "u.permission_id", "=", "p.id")
    .select("u.id", "u.name", "u.email", "p.role_name as permission", "u.password")
    .where(filter);
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}

function isValidRegister(user) {
  return Boolean(user.name && user.email && user.password && typeof user.password === "string");
}

function isValidLogin(user) {
  return Boolean(user.email && user.password && typeof user.password === "string");
}
