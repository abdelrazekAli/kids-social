// Import Packages
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

// Server INIT
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

// Websocket INIT
const socket = require("socket.io");
const io = socket(server);

// Import Websocket modules
require("./socket/socket")(io);

// Import routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const messageRoute = require("./routes/messages");
const uploadRoute = require("./routes/upload");
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

// Main Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));

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
app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: __dirname + "/client/build",
  });
});

// Server listening
let port = process.env.PORT || 8800;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
