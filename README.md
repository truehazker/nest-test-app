## Description

Simple [Nest](https://github.com/nestjs/nest) online library service.

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

## Credentials

Made by [@truehazker](https://github.com/truehazker) for StartBlock.
