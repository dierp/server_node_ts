
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password', 150)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios')
};
