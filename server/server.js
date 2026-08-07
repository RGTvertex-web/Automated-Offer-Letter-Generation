require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const offerRoutes = require("./routes/offerRoutes");


connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/offers", offerRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Offer Letter Automation API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});