import app from "./app";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

module.exports.handler = serverless(app);


// import app from "./app";
// import dotenv from "dotenv";
// import http from "http";
// import serverless from "serverless-http";
// require("dotenv").config();

// const port = process.env.PORT || 5000;

// const httpServer = http.createServer(app);

// httpServer.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// module.exports.handler = serverless(app);
