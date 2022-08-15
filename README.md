## Description

Simple [Nest](https://github.com/nestjs/nest) online library service.

## To Do

- [x] Authentication & Authorization
- [x] View Catalog with available books
- [x] Book reservation
- [x] Book return
- [x] Book search
- [x] Book management for admin

## Installation

```bash
$ npm install
```

## Preparation

Before running the app in `production` mode, you need to create `.env` file in the root directory with the following variables:

Before running the app in `development` mode, you need to create `.env.development` file in the root directory with the following variables:

> _You can use a .env.example file as a template._

| Variable       | Description                    |
|----------------|--------------------------------|
| PORT           | Application port               |
| DATABASE_NAME  | Database file name             |
| JWT_SECRET     | JWT secret                     |
| JWT_EXPIRES_ID | The time of JWT token lifetime |


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

You can use Docker to run the app.

Running this command will create a Docker container with the app.

> **Note:** _Docker uses environment variables to configure the app from `.env` file_

```bash
$ docker-compose up -d
```

## Api documentation

You can use `Swagger UI` to view the generated API documentation.

Just go to `https://localhost:PORT/api/docs` in your browser.

## Tutorials and guides used in this project
- [Advanced NodeJs Backend Development](https://www.youtube.com/watch?v=dDeWWQWMM-Y)
- [Creation of the blog with NestJS](https://www.youtube.com/watch?v=a5g23Fsy6rg&t=189s)
- [Building an E-Commerce API using Nestjs, SQLite, and TypeORM](https://arctype.com/blog/sqlite-nestjs-tutorial)
- [Official Nestjs Documentation](https://docs.nestjs.com)

## Credentials

Made by [@truehazker](https://github.com/truehazker) for StartBlock.
