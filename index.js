const express = require('express');
const logsFromEtherscan = require('./logsFromEtherscan');
// var request = require('request');
require('dotenv').config();

const app = express();

const https = require('https');

app.get('/', (req, res) => {
    https.get(`https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=379224&toBlock=latest&address=${process.env.PUBLIC_ADDRESS}&topic0=0xf63780e752c6a54a94fc52715dbc5518a3b4c3c2833d301a204226548a2a8545&apikey=${process.env.ETHERSCAN_API}`,
     (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    // console.log(JSON.parse(data));
    res.send(data)
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
  res.send(err)
});
    // res.send('Hello');
});

// app.get('/logs', function(req, res, next) {
//     request({
//       uri: 'https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=M9NEKJ4U8YKCCWPB69XJISVNYQPDSPBVIP',
      // qs: {
      //   api_key: 'M9NEKJ4U8YKCCWPB69XJISVNYQPDSPBVIP',
      //   query: 'Etherscan'
      // },
//       function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//           console.log(response);
//           res.json(response);
//         } else {
//           res.json(error);
//         }
//       }
//     });
//   });

// import services
const ethService = require('./eth/index');
const binanceService = require('./binance/index');
const tetherService = require('./tether/index');

app.use('/eth', ethService);
app.use('/bnb', binanceService);
app.use('/tether', tetherService);

// start app
app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Application running on port 3000.');
    }
})