const express = require('express');
const lotRouter = express();

const {addLot, getLot, getParkingLot } = require('../controllers/lot.controller');


lotRouter.post("/addLot", addLot);
lotRouter.post("/getLots", getLot);
lotRouter.post("/getParkingLot", getParkingLot);


module.exports = lotRouter;