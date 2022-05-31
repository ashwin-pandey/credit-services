const express = require('express');
const logsFromEtherscan = require('./logsFromEtherscan');
// var request = require('request');
require('dotenv').config();

const app = express();

const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET']
}));

// import services
const ethService = require('./eth/index');
const binanceService = require('./binance/index');
const tetherService = require('./tether/index');
const daiService = require('./dai/index');
const makerService = require('./maker/index');
const maticService = require('./matic/index');
const nexoService = require('./nexo/index');
const uniswapService = require('./uniswap/index');
const usdcService = require('./usdc/index');

// use routes
app.use('/eth', ethService);
app.use('/bnb', binanceService);
app.use('/tether', tetherService);
app.use('/dai', daiService);
app.use('/maker', makerService);
app.use('/matic', maticService);
app.use('/nexo', nexoService);
app.use('/uniswap', uniswapService);
app.use('/usdc', usdcService);

// start app
app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Application running on port 3000.');
    }
})