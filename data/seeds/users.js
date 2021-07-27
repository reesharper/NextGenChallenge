
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'rees', password: 'password', email: 'rees@mail.com', permission_id: 1},
        { name: 'chaz', password: 'password', email: 'chaz@mail.com', permission_id: 2},
        { name: 'mike', password: 'password', email: 'mike@mail.com', permission_id: 3},
        { name: 'nate', password: 'password', email: 'nate@mail.com', permission_id: 4}
      ]);
    });
};
