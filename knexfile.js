
require('dotenv').config()
module.exports = {
  test: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      database: 'jsts-test',
      user: 'root',
      password: 'root',
      connectTimeout: 90000
    },
    migrations: {
      directory: './src/infra/db/knex/migrations'
    },
    seeds: {
      directory: './src/infra/db/knex/seeds/test'
    }
  },
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      database: 'jsts-dev',
      user: 'root',
      password: 'root',
      connectTimeout: 90000
    },
    migrations: {
      directory: './src/infra/db/knex/migrations'
    },
    seeds: {
      directory: './src/infra/db/knex/seeds/development'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      database: 'jsts',
      user: 'root',
      password: 'root',
      connectTimeout: 90000
    },
    migrations: {
      directory: './src/infra/db/knex/migrations'
    },
    seeds: {
      directory: './src/infra/db/knex/seeds/production'
    }
  }
}
