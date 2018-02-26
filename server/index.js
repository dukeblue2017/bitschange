/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const db = require('./db/index.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ // eslint-disable-line
  path: 'env.env',
});
const axios = require('axios');

const currentPrices = {
  BTC: { price: null, denominator: 'USD' },
  LTC: { price: null, denominator: 'BTC' },
  DOGE: { price: null, denominator: 'BTC' },
  XMR: { price: null, denominator: 'BTC' },
};

const fetchCurrentPrices = () => {
  const pairs = [
    { coin: 'BTC', in: 'USD' },
    { coin: 'LTC', in: 'BTC' },
    { coin: 'DOGE', in: 'BTC' },
    { coin: 'XMR', in: 'BTC' },
  ];
  for (let i = 0; i < pairs.length; i += 1) {
    axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${pairs[i].coin}&tsyms=${pairs[i].in}`)
      .then((res) => { currentPrices[pairs[i].coin].price = res.data[pairs[i].in]; })
      .catch(err => console.log(err));
  }
};

fetchCurrentPrices();

const port = 5000;
const app = express();

app.use(express.static(path.join(__dirname, '/../bitschange-client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(port, () => {
  console.log(`\nServer running on port ${port}\n`); // eslint-disable-line
});

// this could be used to save the hash in the db
// bcrypt.hash(req_password, saltRounds).then(hash => db.setHash(req_username,hash)).catch(err => console.log(err));
// const saltRounds = process.env.SALT_ROUNDS;

app.post('/login', (req, res) => {
  const reqUsername = req.body.username;
  const reqPassword = req.body.password;
  db.fetchHash(reqUsername)
    .then(dbRes => bcrypt.compare(reqPassword, dbRes[0].PassHash))
    .then((doesMatch) => {
      if (doesMatch) {
        const token = jwt.sign(reqUsername, process.env.JWT_SECRET);
        res.json({ token });
      } else {
        res.send('Incorrect password');
      }
    })
    .catch(err => res.send(err));
});

// this middleware needs to come after the post to /login route
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(403).json({
          message: 'Invalid Token',
        });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({
      message: 'No Token Provided',
    });
  }
});


app.get('/balances', (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      res.send(err);
    } else {
      const username = decode;
      db.fetchBalances(username)
        .then((dbRes) => { res.send(dbRes); })
        .catch((dbErr) => { res.send(dbErr); });
    }
  });
});

app.get('/prices', (req, res) => {
  // need to resolve the async issue here
  fetchCurrentPrices();
  res.send(currentPrices);
});


app.post('/buy', (req, res) => {
  fetchCurrentPrices();
  const coinToBuy = req.body.coinToBuy;
  const buyQuantity = req.body.quantity * 1;
  const price = currentPrices[coinToBuy].price * 1;
  const denominator = currentPrices[coinToBuy].denominator;
  const denomQtNeeded = buyQuantity * price;
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      res.send(err);
    } else {
      const username = decode;
      db.fetchTwoBalances(username, coinToBuy, denominator)
        .then((dbRes) => {
          const coinToBuyBalance = dbRes[0][coinToBuy];
          const denomBalance = dbRes[0][denominator];
          if (denomBalance >= denomQtNeeded) {
            console.log(`Attempting to buy ${buyQuantity} ${coinToBuy}`);
            const newCTBBalance = coinToBuyBalance + buyQuantity;
            const newDenomBalance = denomBalance - denomQtNeeded;
            db.processBuy(username, coinToBuy, newCTBBalance, denominator, newDenomBalance)
              .then((dbBuyRes) => {
                console.log('dbBuyRes:', dbBuyRes);
                res.status(200).end();
              })
              .catch((dbBuyErr) => {
                console.log(dbBuyErr);
                res.status(500).send(dbBuyErr);
              });
          } else {
            console.log('not enough of denom', dbRes);
            res.send('not enough of denominator');
          }
        })
        .catch((DBerr) => { res.status(500).send(DBerr); });
    }
  });
});
