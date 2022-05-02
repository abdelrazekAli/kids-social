const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [],
  callUsers = {},
  socketToRoom = {};

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // Room
  socket.on("join room", (roomID) => {
    if (callUsers[roomID]) {
      const length = callUsers[roomID].length;
      if (length === 2) {
        socket.emit("room full");
        return;
      }
      callUsers[roomID].push(socket.id);
    } else {
      callUsers[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = callUsers[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("offering call", (data) => {
    console.log(data);
    const user = getUser(data.friendId);
    io.to(user?.socketId).emit("offering call", data);
  });

  socket.on("canceling call", (username) => {
    socket.broadcast.emit("canceling call", username);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
    socket.broadcast.emit("callEnded");
    // Room
    const roomID = socketToRoom[socket.id];
    let room = callUsers[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      callUsers[roomID] = room;
    }
  });
});
