// Update with your config settings.
require('dotenv').config()

localpg = {
  host: 'localhost',
  database: 'market-organizer',
  user: 'postgres',
  password: process.env.DATABASE_PASSWORD
}
module.exports = {

  development: {
    client: 'pg',
    connection: localpg, 
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
