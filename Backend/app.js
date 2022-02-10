require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

//app config
const app = express();
//for middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const channelRoutes = require("./routes/channel.js");
const playlistRoutes = require("./routes/playlist.js");
const commentRoutes = require("./routes/comment");
const thumbnailRoutes = require("./routes/thumbnail");
const categoryRoutes = require("./routes/category");
const videoRoutes = require("./routes/video");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

//MiddleWares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", channelRoutes);
app.use("/api", playlistRoutes);
app.use("/api", commentRoutes);
app.use("/api", thumbnailRoutes);
app.use("/api", categoryRoutes);
app.use("/api", videoRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//PORT
const port = process.env.PORT || 8000;

//SECURITY
var helmet = require("helmet");
app.use(helmet());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("====================================");
  console.log(`app running ${port}`);
  console.log("====================================");
});
