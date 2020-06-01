const express = require('express');
const slotRouter = express();

const {getSlots } = require('../controllers/slots.controller');

slotRouter.post("/getSlots",getSlots);

module.exports = slotRouter;