
const express = require('express');
require('dotenv').config();


const app = express();

const https = require('https');

app.get('/', (req, res) => {
    https.get(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x6B175474E89094C44Da98b954EedeAC495271d0F&address=${process.env.PUBLIC_ADDRESS}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.ETHERSCAN_API}`,
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
    
});


app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Application running on port 3000.');
    }
})