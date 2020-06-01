const db = require("../models");
const Mall = db.mall;
const Slot = db.slot;
const Lot = db.lot;
const Bookings = db.bookingDetails
const moment = require('moment');


exports.getSlots = (req, res)=>{

    Mall.findOne({ where: { mall_name: req.body.mallName } }).then((mall)=>{
        if (mall === null) {
            console.log('Not found!');
            return res.status(400).json({message: "The selected mall doesnt exists in the database"});
        }
        else{
            getEmptyLotandSlotforMall(mall.id, req.body.startDate, req.body.startTime ).then((data)=>{
                console.log("Data for booking!!!")
                console.log(data)
                if(data==undefined){
                    return res.json({message:"There is no parking slot available at this time please book at a different time or selct a different mall"})
                }
                Bookings.create({mall_name: req.body.mallName,
                    lot_name:  data[0],
                    slot_num: data[2],
                    userName: req.body.userName,
                    start_date: req.body.startDate,
                    start_time: req.body.startTime,
                    end_date: req.body.startDate,
                    end_time: moment(req.body.startTime,'HH:mm').add(3,'hours').format('HH:mm'),
                    slotId: data[3],
                    mallId:mall.id}).then((data)=>{return res.json({message: `Hi ${data.dataValues.userName}, Your car parking is booked for 3 Hrs in ${req.body.mallName}.
                    Your car can be parked at ${data.dataValues.lot_name} slot number ${data.dataValues.slot_num}.` })})
            })
        }
    })

}


const getEmptyLotandSlotforMall = async (mallId, startDate , startTime)=>{
    var lotName
    var lotId
    var slotName
    var slotId
    var mallDetails = await Mall.findByPk(mallId, { include: ["lot"] })
    console.log("1111111111111111111")
    console.log("The data for the mall")
    console.log(mallDetails.dataValues)
    console.log("The data for the mall lots")
    console.log(mallDetails.dataValues.lot)
    var slotStartTime = moment(startTime,'HH:mm').format('HH:mm')
    var slotEndTime = moment(slotStartTime,'HH:mm').add(3,'hours').format('HH:mm')
    console.log(slotStartTime)
    console.log(slotEndTime)

    for(let i=0 ; i<mallDetails.dataValues.lot.length; i++){
        console.log("This is the lot id")
        console.log(mallDetails.dataValues.lot[i].dataValues.id)
        var slotForThisLot = await Slot.findAll({ where: { lotId: mallDetails.dataValues.lot[i].dataValues.id } })
        console.log("11111111")
        console.log(slotForThisLot.length)


        for(let j =0; j<slotForThisLot.length; j++){
            console.log("this is your slot")
            console.log(slotForThisLot[j].dataValues)

            //var bookingDetailForThisSlot = await Bookings.findOne({where: { slotID: slotForThisLot[j].dataValues.id , start_date:startDate, start_time: startTime, end_time: moment(startTime,'HH:mm').add(3,'hours').format('HH:mm:ss')  }})
            console.log("33333333")
            var getAllBookings = await Bookings.findAll({where:{slotId: slotForThisLot[j].dataValues.id, start_date:startDate}})
            //console.log(bookingDetailForThisSlot)
            console.log(getAllBookings.length)
            var slotCheck;
            for(let i=0; i<getAllBookings.length; i++){
                start_time = moment(getAllBookings[i].dataValues.start_time,'HH:mm').format('HH:mm')
                end_time   = moment(getAllBookings[i].dataValues.end_time,'HH:mm').format('HH:mm')
                if((start_time>slotStartTime &&start_time>=slotEndTime) ||( slotStartTime>=end_time && slotEndTime>end_time)){
                    console.log("its is true")
                    slotCheck=true
                }
                else{console.log("its is false");slotCheck= false;break;}
            }
            if(getAllBookings.length==0 || slotCheck){
                lotName  = mallDetails.dataValues.lot[i].dataValues.lot_name
                lotId    = mallDetails.dataValues.lot[i].dataValues.id
                slotName = slotForThisLot[j].dataValues.slot_number
                slotId   = slotForThisLot[j].dataValues.id
                return [lotName, lotId, slotName, slotId]
            }
        }
    }


}


exports.addSlots = (req, res) => {
    return Slot.create({
        slot_number: req.body.slotNumber,
        lotId: req.body.lotId,
    })
      .then((slot) => {
        console.log(">> Slot Created: " + JSON.stringify(slot, null, 4));
        return res.json({slot});
      })
      .catch((err) => {
        console.log(">> Error while creating slot: ", err);
        return res.status(400).json({error: err.message})
      });
  }
