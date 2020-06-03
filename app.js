const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan")
const {run} = require('./dbloader/run')
const app = express();
const db = require("./models");

//routers
const mallRoutes = require('./routes/mall.routes');
const lotRoutes = require('./routes/lot.routes')
const bookingDetailRoutes = require('./routes/bookingDetails.routes')

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan())

//run()

db.sequelize.sync();
const PORT = process.env.PORT || 4500;

app.get("/health", (req, res) => {
  res.json({ message: `The application is running in port: ${PORT}` });
});

app.use('/api/mall',mallRoutes);
app.use('/api/lot',lotRoutes);
app.use('/api/bookingDetail',bookingDetailRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


module.exports = app;