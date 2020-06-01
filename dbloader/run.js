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
    const lot2 = await addLot(mall1.id , "Parking Lot B")

    const slot1 = await addSlot(lot1.id , "100")
    const slot2 = await addSlot(lot1.id , "101")
    const slot3 = await addSlot(lot1.id , "102")
    const slot4 = await addSlot(lot2.id , "201")
    const slot5 = await addSlot(lot2.id , "202")

  }