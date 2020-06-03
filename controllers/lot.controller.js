const db = require("../models");
const Lot = db.lot;
const Mall = db.mall;
const Bookings = db.bookingDetails
const moment = require('moment');

exports.addLot = (req, res) => {
     return Lot.create({
         lot_name: req.body.lotName,
         mallId: req.body.mallId,
     })
       .then((lot) => {
         console.log(">> Lot Created: " + JSON.stringify(lot, null, 4));
         return res.json({lot});
       })
       .catch((err) => {
         console.log(">> Error while creating lot: ", err);
         return res.status(400).json({error: err.message})
       });
   }

exports.getLot  = (req, res)=>{
    return Lot.findAll({where:{mallId:req.body.mallId}})
    .then((lots)=>{return res.json({ lots })})
    .catch((err)=>{return res.status(400).json({error: "Database has no lots!!!"})})
}

exports.getParkingLot = (req, res)=>{
  Mall.findOne({ where: { mall_name: req.body.mallName } }).then((mall)=>{
    if (mall === null) {
      return res.status(400).json({message: "The selected mall doesnt exists in the database"});
    }
    else {
      getEmptyParkingLotforMall(mall.id, req.body.startDate, req.body.startTime).then((data)=>{
        if(data==undefined){
          return res.json({message:"There is no parking lot available at this time please book at a different mall"})
        }
        Bookings.create({mall_name: req.body.mallName,
          lot_name:  data[0],
          userName: req.body.userName,
          start_date: req.body.startDate,
          start_time: req.body.startTime,
          end_date: req.body.startDate,
          end_time: moment(req.body.startTime,'HH:mm').add(3,'hours').format('HH:mm'),
          lotId: data[1],
          mallId:mall.id}).then((data)=>{return res.json({message: `Hi ${data.dataValues.userName}, Your car parking is booked for 3 Hrs in ${req.body.mallName}.
          Your car can be parked at ${data.dataValues.lot_name}.` })})
      })
    }
  });
}

const getEmptyParkingLotforMall = async (mallId, startDate , startTime)=>{
  var lotName
  var lotId
  var mallDetails = await Mall.findByPk(mallId, { include: ["lot"] })
  var slotStartTime = moment(startTime,'HH:mm').format('HH:mm')
  var slotEndTime = moment(slotStartTime,'HH:mm').add(3,'hours').format('HH:mm')
  for(let i=0 ; i<mallDetails.dataValues.lot.length; i++){
      var getAllBookings = await Bookings.findAll({where:{lotId: mallDetails.dataValues.lot[i].dataValues.id, start_date:startDate}})
      var slotCheck;
      for(let i=0; i<getAllBookings.length; i++){
          start_time = moment(getAllBookings[i].dataValues.start_time,'HH:mm').format('HH:mm')
          end_time   = moment(getAllBookings[i].dataValues.end_time,'HH:mm').format('HH:mm')
          if((start_time>slotStartTime &&start_time>=slotEndTime) ||( slotStartTime>=end_time && slotEndTime>end_time)){
              slotCheck=true
          }
          else{slotCheck= false;break;}
      }
      if(getAllBookings.length==0 || slotCheck){
            lotName  = mallDetails.dataValues.lot[i].dataValues.lot_name
            lotId    = mallDetails.dataValues.lot[i].dataValues.id
            return [lotName, lotId]
          }
      }
  }
