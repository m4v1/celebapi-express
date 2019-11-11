// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: 'dockerdb',
      user: 'root',
      password: 'dockerpass'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    }
  },

  testing: {
    client: 'mysql2',
    connection: {
      database: 'dockertest',
      user: 'root',
      password: 'dockerpass'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      database: 'dockerdb',
      user: 'root',
      password: 'dockerpass'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    }
  }
};
