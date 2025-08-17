const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/database");

// Import Routes
const userRoutes = require("./routes/user.routes");
const mockinterviewRoutes = require("./routes/mockinterview.routes");
const geminiRoutes =require("./routes/gemini.routes");
const healthRoutes = require("./routes/health.routes");

dotenv.config();

const app = express();

// Database Connection
connectDB();


app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// API Routes
// API Routes
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/mockinterview", mockinterviewRoutes);
app.use("/api/v1/ai", geminiRoutes);


module.exports = app;