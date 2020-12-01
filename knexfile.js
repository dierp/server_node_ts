
module.exports = {
    client: 'mysql',
    connection: {
      host: process.env.APP_DB_HOST,
      port: process.env.APP_DB_PORT,
      database: process.env.APP_DB_NAME,
      user: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASSWORD,
      connectTimeout: 90000,
    },
    pool: {
      min: 1,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "./src/infra/db/knex/migrations"
    }
};