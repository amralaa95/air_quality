<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS IQ AIR Application

A Simple Web API with NestJs, Postgres, Sequelize ORM.

# Running the app development
- Installing dependencies
```bash
yarn
```

- Open `src/static/config/dev.json` and changes values of secrets.databases.username & secrets.databases.password to your database username & password.

- For first time (non existing DB) run next command and enter your database username and password.
```bash
yarn init:db
```

- Run the APIs & cronjobs.
```bash
yarn dev
```

It'll run the APIs on port 3000 & cronjobs and you can access the APIs in http://localhost:3000/api

# Run tests
```bash
yarn test
```