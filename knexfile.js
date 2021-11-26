module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './data/database.db3',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
};
