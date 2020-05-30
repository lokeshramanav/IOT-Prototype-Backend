const express = require('express');
const mallRouter = express();

const {getMalls , addMall } = require('../controllers/mall.controller');

mallRouter.get("/getMalls",getMalls);
mallRouter.post("/addMall",addMall);


module.exports = mallRouter;