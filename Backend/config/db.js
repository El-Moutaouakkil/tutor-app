const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

const connectDB = async () => {
    try {
        //database Name
        const con = await mongoose.connect(db, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB