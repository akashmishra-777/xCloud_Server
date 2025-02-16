const mongoose = require("mongoose")
async function Db_Connection() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DATABASE IS CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.log("ERROR WHILE CONNECTING TO THE DATABASE",error.message)
    }
}

db = Db_Connection()
module.exports = db