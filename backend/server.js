const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRouter = require("./routes/authRoutes");
const jobRouter = require("./routes/jobRoutes");
const applicationRouter = require("./routes/applicationRoutes");

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Correct routes
app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running at port " + PORT);
});