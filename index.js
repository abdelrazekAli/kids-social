// Import Packages
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize")

// Server INIT
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());
app.use(morgan("common"));

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Websocket INIT
const socket = require("socket.io");
const io = socket(server);

// Import Websocket modules
require("./socket/socket")(io);

// Import routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const commentRoute = require("./routes/comments");
const messageRoute = require("./routes/messages");
const conversationRoute = require("./routes/conversations");

// Dotenv configuration
require("dotenv").config();

// Database connection
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

require("mongoose").connect(process.env.DB_URL, connectOptions, () => {
  console.log("Connected to DB");
});


// Multimedia Middlewares
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/voices", express.static(path.join(__dirname, "public/voices")));

// Routes Middlewares
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/upload", uploadRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/conversations", conversationRoute);

// For production
if (process.env.PROD) {
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

// Server listening
let port = process.env.PORT || 8800;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
