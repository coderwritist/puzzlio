const mongoose = require("mongoose")
mongoose.set('strictQuery', true)

const DBconn= async()=>{
    
    try
    {
        await mongoose.connect("mongodb+srv://siddarthan23102:voldyvoldy1@cluster0.lgqqn0m.mongodb.net/puzzlio?retryWrites=true&w=majority")
    }
    catch(err)
    {
        console.log(err)
    }
}

module.exports = DBconn