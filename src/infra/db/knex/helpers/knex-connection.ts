import knex from "knex";

export const connect = () => {
    return knex({
        client: 'mysql',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : 'root',
            database : 'jsts',
            connectTimeout: 90000,
            typeCast: (field, next) => {
            if (field.type == 'TIMESTAMP' || field.type == 'DATETIME') {
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
            tableName: 'knex_migrations'
        }
      })
}