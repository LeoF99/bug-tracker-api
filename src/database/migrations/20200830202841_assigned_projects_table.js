/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('assigned_projects', (table) => {
    table.string('user_id').references('id').inTable('users').notNull()
      .onDelete('cascade');
    table.string('project_id').references('id').inTable('projects').notNull()
      .onDelete('cascade');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.droptable('assigned_projects');
};
