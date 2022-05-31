const { status } = require('express/lib/response');
const https = require('https');

module.exports = {
    getBalance: async (req, res) => {
        const address = req.params.address;

        const url = `${process.env.ETHERSCAN_BASE_URL}?module=${process.env.MODULE_ACCOUNT}&action=${process.env.ACTION_TOKENBALANCE}&contractaddress=${process.env.NEXO_CONTRACT_ADDRESS}&address=${address}&tag=${process.env.TAG_LATEST}&apikey=${process.env.ETHERSCAN_APIKEY}`;

        https.get(url,
        (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
            data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                // console.log(JSON.parse(data));
                const jsonData = JSON.parse(data);
                const balance = jsonData.result * Math.pow(10, -18);
                console.log(balance);
              // calculate score
              let score = 0;
              if (jsonData.status == 0) {
                score = 0;
            } else if (balance < 20) {
                  score += balance;
              } else {
                  score = 20;
              }

              // result object
              let result = {
                  balance: balance,
                  score: parseFloat(score.toFixed(2))
              };

              // console.log(balance);
              const response = {
                  status: jsonData.status,
                  message: jsonData.message,
                  result: result
              }
                res.send(response);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.send(err)
        });

    }
}