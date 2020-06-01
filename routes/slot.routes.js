const express = require('express');
const slotRouter = express();

const {getSlots ,addSlots } = require('../controllers/slots.controller');

slotRouter.post("/getSlots",getSlots);
slotRouter.post("/addSlots",addSlots);

module.exports = slotRouter;