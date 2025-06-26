const mongoose = require("mongoose")


const connectToDb = async () => {

    try {

        if (mongoose.connections[0].readyState) {
            return true
        } else {
            await mongoose.connect(process.env.MONGO_URL)
            // console.log(' CONNECT TO DATABASE SUCCESFULLY :) ')
        }


    } catch (err) {
        console.log('db connection has error ==>' + err.toString())
    }


}


export default connectToDb