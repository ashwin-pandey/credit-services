const { status } = require('express/lib/response');
const https = require('https');

module.exports = {

    getBalance: async function(req, res) {
        const address = req.params.address;

        const url = `${process.env.ETHERSCAN_BASE_URL}?module=${process.env.MODULE_ACCOUNT}&action=${process.env.ACTION_BALANCE}&address=${address}&tag=${process.env.TAG_LATEST}&apikey=${process.env.ETHERSCAN_APIKEY}`;

        // console.log(url);
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
                    // 10^-18
                    const balance = jsonData.result * Math.pow(10, -18);

                    // calculate score
                    let score = 0;
                    if (jsonData.status == 0) {
                        score = 0;
                    } else if (balance < 50) {
                        score += balance;
                    } else {
                        score = 50;
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
                    res.send(response).status(200);
                });
            }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.send(err)
        });
    }

}