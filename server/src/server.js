const app = require("./app");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();
console.log("The FRONTEND_URL environment variable is: ", process.env.FRONTEND_URL);

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});