const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/users.js");
const videoRoutes = require("./routes/videos.js");
const commentRoutes = require("./routes/comments.js");
const authRoutes = require("./routes/auth.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

//listen
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
