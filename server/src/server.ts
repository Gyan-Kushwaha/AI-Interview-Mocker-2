import app from "./app";
import dotenv from "dotenv";
import http from "http";

require("dotenv").config();

const port = process.env.PORT || 5000;

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
});