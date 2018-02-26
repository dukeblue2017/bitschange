/* eslint-disable no-unused-vars, no-console */
const dotenv = require('dotenv').config({
  path: 'env.env',
});

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  },
});

const db = {};

// db.setHash = (username, hash) => knex('users').update({ PassHash: hash }).where({ username });

db.fetchHash = username => knex('users').select('PassHash').where({ username });

db.fetchBalances = username => knex('users').select(['USD', 'BTC', 'LTC', 'DOGE', 'XMR']).where({ username });

db.fetchTwoBalances = (username, coinOne, coinTwo) => knex('users').select([coinOne, coinTwo]).where({ username });

db.processBuy = (username, coinToBuy, newCTBQt, denominator, newDenomQt) => {
  // console.log(coinToBuy, newCTBQt, denominator, newDenomQt);
  if (coinToBuy === 'BTC' && denominator === 'USD') {
    console.log('11111');
    return knex('users').update({ BTC: newCTBQt, USD: newDenomQt }).where({ username });
  } else if (coinToBuy === 'LTC' && denominator === 'BTC') {
    console.log('22222');
    return knex('users').update({ LTC: newCTBQt, BTC: newDenomQt }).where({ username });
  } else if (coinToBuy === 'DOGE' && denominator === 'BTC') {
    console.log('33333');
    return knex('users').update({ DOGE: newCTBQt, BTC: newDenomQt }).where({ username });
  } else if (coinToBuy === 'XMR' && denominator === 'BTC') {
    console.log('44444');
    return knex('users').update({ XMR: newCTBQt, BTC: newDenomQt }).where({ username });
  } console.log('didnt go to one of the db elses');
  return 'didnt work';
};

module.exports = db;
