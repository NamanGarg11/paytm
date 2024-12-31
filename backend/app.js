const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDB = require("./db/db");
const MainRouter = require("./routes/main.routes");

// Load environment variables
dotenv.config();

// Validate environment variables
if (!process.env.MONGO_URL) {
    console.error("Error: MONGO_URL is not set in the environment variables.");
    process.exit(1);
}

const app = express();

// Connect to the database
connectToDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded requests

// Base route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Main API routes
app.use("/api/v1", MainRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

module.exports = app;

