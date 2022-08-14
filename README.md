## Description

Simple [Nest](https://github.com/nestjs/nest) online library service.

## To Do

- [x] Authentication & Authorization
- [x] View Catalog with available books
- [x] Book reservation
- [x] Book return
- [x] Book search
- [x] Book management for admin

## Milestones

- [x] Implement registration of new users
- [x] Implement login of existing users
- [x] Implement administrator functionality
  - [x] Add new books
  - [x] Issue books to users
  - [x] Add new roles
  - [x] Assign users to roles
- [x] Implement booking of books
- [x] Implement returning of books
- [x] Implement search functionality
  - [x] Search by title
  - [x] Search by author

## Tables

- Users
  - name
  - surname
  - birthdate
  - passport
  - role
  - email
  - password
- Books
  - title
  - author
  - description
- Borrows
  - Status
  - CreatedAt
  - IssuedAt
  - ExpectedAt
  - ReturnedAt
  - Related User
  - Related Book
- Tickets
  - user_id
  - book_id
  - issued_at
  - expected_at
  - returned_at
- Roles
  - title
  - description

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Tutorials and guides used in this project
- [Advanced NodeJs Backend Development](https://www.youtube.com/watch?v=dDeWWQWMM-Y)
- [Creation of the blog with NestJS](https://www.youtube.com/watch?v=a5g23Fsy6rg&t=189s)
- [Building an E-Commerce API using Nestjs, SQLite, and TypeORM](https://arctype.com/blog/sqlite-nestjs-tutorial)
- [Official Nestjs Documentation](https://docs.nestjs.com)

## Credentials

Made by [@truehazker](https://github.com/truehazker) for StartBlock.
