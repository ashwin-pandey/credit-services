const handler = require('./functions/handler');

const express = require('express');
const router = express.Router();

router.get('/balance/:address', handler.getBalance);

module.exports = router;
