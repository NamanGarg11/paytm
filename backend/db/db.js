const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB connection URL from environment variables
const url = process.env.MONGO_URL;

// Function to connect to the database
const connectToDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection failed", err);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectToDB;
