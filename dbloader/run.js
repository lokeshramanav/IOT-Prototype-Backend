const {addMall} = require('./addMall')
const {addLot} = require('./addlot')
const {addSlot} = require('./addSlot')

exports.run = async ()=>{
    const mall1 = await addMall({
        mall_name: "Marina Bay",
        mall_location: "MBS"
    })

    const mall2 = await addMall({
        mall_name: "Marina Financial",
        mall_location: "MBS"
    })

    const mall3 = await addMall({
        mall_name: "Marina Barrage",
        mall_location: "MBS"
    })

    const lot1 = await addLot(mall1.id , "Parking Lot A")

    const slot1 = await addSlot(lot1.id , "100")
  }