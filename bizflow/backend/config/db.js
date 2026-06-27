const mongoose = require('mongoose');
require('dotenv').config();
//connecting to mongodb using the .env file having connecting url
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('MongoDB Connected');
    } catch (error) {
        console.log(process.env.MONGODB_URI);
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;