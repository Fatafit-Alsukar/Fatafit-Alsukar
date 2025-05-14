const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const membershipRoutes = require("./routes/membershipRequests");
const patientRequestRoutes = require("./routes/patientRequests");
const volunteerRequestRoutes = require("./routes/volunteerRequests");




const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");
const serviceRoutes = require("./routes/serviceRoutes")
const activityRoutes = require("./routes/activityRoutes");
/****************************************************************** */

app.use(express.json());
app.use(cookieParser());
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

app.use('/uploads', express.static('uploads'));
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api", activityRoutes);
app.use("/api/requests", membershipRoutes);
app.use("/api/requests", patientRequestRoutes);
app.use("/api/requests", volunteerRequestRoutes);


/*******************************************************************/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
