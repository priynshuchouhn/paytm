const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connectDb() {
    const URI = process.env.MONGO_URL
    mongoose.connect(URI).then(res => {
        console.log('Database connected successfully ');
    }).catch((err)=>{
        console.log('Failed to connect to database')
    })
}

module.exports = connectDb;