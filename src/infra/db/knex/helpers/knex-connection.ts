import knex from 'knex'

export const connect = (): knex => {
  return knex({
    client: 'mysql',
    connection: {
      host: process.env.APP_DB_HOST,
      port: +process.env.APP_DB_PORT,
      database: process.env.APP_DB_NAME,
      user: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASSWORD,
      typeCast: (field, next) => {
        if (field.type === 'TIMESTAMP' || field.type === 'DATETIME') {
          return field.string()
        }
        return next()
      }
    },
    pool: {
      min: 1,
      max: 20
    },
    migrations: {
      tableName: './knex_migrations'
    }
  })
}
