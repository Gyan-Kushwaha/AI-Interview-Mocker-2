const app = require("./app");
const dotenv = require("dotenv");

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));


dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});