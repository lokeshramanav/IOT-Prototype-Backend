const express = require('express');
const bookingDetailRouter = express();


const {deleteDetails } = require('../controllers/bookingDetails.controller');

bookingDetailRouter.delete("/delete",deleteDetails);

module.exports = bookingDetailRouter;