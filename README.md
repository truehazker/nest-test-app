## Description

Simple [Nest](https://github.com/nestjs/nest) online library service.

## To Do

- [x] Implement registration of new users
- [x] Implement login of existing users
- [ ] Implement administrator functionality
  - [ ] Add new books
  - [ ] Issue books to users
  - [x] Add new roles
  - [x] Assign users to roles
- [ ] Implement booking of books
- [ ] Implement returning of books
- [ ] Implement search functionality
  - [ ] Search by title
  - [ ] Search by author

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
