const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();



const userRoute = require("./routes/userRoutes");
/****************************************************************** */
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // أو النطاق الخاص بك
    credentials: true,
  })
);
/****************************************************************** */

//************************************************************************************************** */
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
//************************************************************************************************** */

app.use("/api/users", userRoute);




/*******************************************************************/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
