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
    origin: (origin, callback) => {
      // السماح لأي Origin (أو عدم وجود origin مثل Postman / curl)
      if (!origin || origin.startsWith("http://localhost") || origin.includes("onrender") || origin.includes("vercel")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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

app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api", activityRoutes);

// المسارات الخاصة بأنواع الطلبات
app.use("/api/requests/membership", membershipRoutes);
app.use("/api/requests/patient", patientRequestRoutes);
app.use("/api/requests/volunteer", volunteerRequestRoutes);

app.use("/api/requests", patientRequestRoutes);
app.use("/api/requests", volunteerRequestRoutes);

/*******************************************************************/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
