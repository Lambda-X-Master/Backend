// Update with your config settings.
require('dotenv').config()

localPg = {
  host: 'localhost',
  database: 'market-organizer',
  user: 'postgres',
  //password: process.env.DATABASE_PASSWORD
  password: 'password'
}

const productionDbConnection = process.env.DATABASE_URL || localPg;
module.exports = {

  development: {
    client: 'pg',
    connection: localPg, 
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
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
  }

};
