var express = require('express');
var router = express.Router();
var request = require('request');
require('dotenv').config();

router.get('/', function(req, res, next) {
  request({
    uri: `https://api.etherscan.io/api?module=account&action=txlist&address=${process.env.PUBLIC_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API}`,
    // qs: {
    //   api_key: 'M9NEKJ4U8YKCCWPB69XJISVNYQPDSPBVIP',
    //   query: 'Etherscan'
    // },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(response);
        res.json(response);
      } else {
        res.json(error);
      }
    }
  });
});

module.exports = router;