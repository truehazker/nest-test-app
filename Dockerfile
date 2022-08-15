FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "start", "start:dev", "start:prod"]
