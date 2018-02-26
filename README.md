# Bitschange
##### A pretend cryptocurrency exchange

Cryptocurrency trading prices are from Cryptocompare: https://www.cryptocompare.com/api/

### Installation Instructions
1. ```npm run setup```
1. Create ```env.env``` file in the root directory with the following variables
    + DB_HOST
    + DB_USER
    + DB_PASS
    + DB_DATABASE
    + SALT_ROUNDS
    + JWT_SECRET

### Devlopment Instructions
```bitschange-client/``` runs on port 3000 in development, and needs ```server/index.js``` to be running on port 5000.

```npm run start-dev``` starts both servers using Concurrently.

### Production Instructions
```npm run start-production``` builds the production client and starts running ```server/index.js``` on port 5000, which also serves up the production client files.

```npm run build-client``` builds the production client, which is stored in ```bitschange-client/build/```.