
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('permission').del()
    .then(function () {
      // Inserts seed entries
      return knex("permission")
      .insert([
        {role_name: 'administrator'},
        {role_name: 'moderator'},
        {role_name: 'content creator'},
        {role_name: 'unprivileged'}
      ])
    });
};
