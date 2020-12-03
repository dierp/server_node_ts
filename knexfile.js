// const knexProd = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: 'localhost',
//     port: 3306,
//     database: 'jsts',
//     user: 'root',
//     password: 'root',
//     // host: process.env.APP_DB_HOST,
//     // port: process.env.APP_DB_PORT,
//     // database: process.env.APP_DB_NAME,
//     // user: process.env.APP_DB_USER,
//     // password: process.env.APP_DB_PASSWORD,
//     connectTimeout: 90000
//   },
//   pool: {
//     min: 1,
//     max: 20
//   },
//   migrations: {
//     tableName: 'knex_migrations',
//     directory: './src/infra/db/knex/migrations'
//   }
// })
// const knexTest = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: 'localhost',
//     port: 3306,
//     database: 'jsts-test',
//     user: 'root',
//     password: 'root',
//     connectTimeout: 90000
//   },
//   pool: {
//     min: 1,
//     max: 20
//   },
//   migrations: {
//     tableName: 'knex_migrations',
//     directory: './src/infra/db/knex/migrations'
//   }
// })
// module.exports = { knexProd, knexTest }
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
