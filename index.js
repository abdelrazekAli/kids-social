const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// Import routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const messageRoute = require("./routes/messages");
const uploadRoute = require("./routes/upload");
const conversationRoute = require("./routes/conversations");

dotenv.config();

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(process.env.DB_URL, connectOptions, () => {
  console.log("Connected to DB");
});
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/voices", express.static(path.join(__dirname, "public/voices")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/upload", uploadRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/conversations", conversationRoute);

let port = process.env.port || 8800;

app.listen(port, () => {
  console.log(`Backend is running on ${port}`);
});
