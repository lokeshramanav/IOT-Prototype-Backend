const express = require('express');
const lotRouter = express();

const {addLot, getLot } = require('../controllers/lot.controller');


lotRouter.post("/addLot", addLot);
lotRouter.post("/getLots", getLot);


module.exports = lotRouter;