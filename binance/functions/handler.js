const https = require('https');

module.exports = {
    getBalance: async (req, res) => {
        const address = req.params.address;

        const url = `${process.env.ETHERSCAN_BASE_URL}?module=${process.env.MODULE_ACCOUNT}&action=${process.env.ACTION_TOKENBALANCE}&contractaddress=${process.env.BNB_CONTRACT_ADDRESS}&address=${address}&tag=${process.env.TAG_LATEST}&apikey=${process.env.ETHERSCAN_APIKEY}`;

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
            res.send(data)
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.send(err)
        });

    }
}