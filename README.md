# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).

## MongoDB Setup

### Authenthication

Guide: https://www.mongodb.com/docs/manual/tutorial/configure-scram-client-authentication/

1. Start a mongodb instance
```bash
cd db;
sudo docker compose up -d
```
1. Start bash on the docker instance and connect to mongodb using `mongosh` with the root user setted on the docker compose
```bash
sudo docker exec -it <container-id> bash
mongosh --username <MONGO_INITDB_ROOT_USERNAME>  --authenticationDatabase admin
```
1. Create an admin user and set a password for your user, in this case `inventory-dev`
```js
db.createUser({
  user: 'inventory-dev',
  pwd: passwordPrompt(), // or cleartext password
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
});
```
1. Set your MONGODB_URI in the .env file to
```bash
MONGODB_URI=mongodb://inventory-dev:<PASSWORD_FOR_CREATED_USER>@localhost:27017
```

