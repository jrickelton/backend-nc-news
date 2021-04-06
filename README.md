# NC-NEWS

An API to access data programmatically - mimicking a real world back end service (e.g. Reddit)

The database is **PSQL** and interacted with **KNEX**.

Hosted version at https://jrickelton-nc-news-app.herokuapp.com/api

## Requirements

- node.js v14.15.5

## Dependencies

- express v^4.17.1,
- knex v^0.95.2
- postgreSQL v^8.5.1

## Instructions

### To run the app locally:

1. Clone the repo from https://github.com/jrickelton/be-nc-news
2. Navigate to the cloned repo in your terminal
3. Run `npm install` to install dependencies: express.js, knex, pg.
4. Run `knex init` to create a `knexfile.js` and update the config:

```
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news",
    },
  },
  test: {
    connection: {
      database: "nc_news_test",
    },
  },
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: { rejectUnauthorized: false },
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };`
```

_Note_ If you are running on Linux you may need to include a user and password as properties on the development and test objects

5. Run "npm run start-local" in the CLI

6. Open a web browser and navigate to `localhost:9090/api` to view a JSON file which lists the available endpoints and descriptions of their contents.

## Testing

1. Install `jest`, `jest-sorted` and `supertest`
2. Run `npm run test-app`
