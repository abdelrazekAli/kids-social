module.exports = (io) => {
  let users = [],
    callUsers = {},
    socketToRoom = {};

  // Add new user
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  // Remove user
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  // Get user
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    // When user connect
    console.log("a user connected.");

    // Add user and return it
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    // Send and get message
    socket.on("sendMessage", ({ senderId, receiverId, content }) => {
      const user = getUser(receiverId);
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        content,
      });
    });

    // Join room
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

      // Return room users
      const usersInThisRoom = callUsers[roomID].filter(
        (id) => id !== socket.id
      );
      socket.emit("all users", usersInThisRoom);
    });

    // Offer new call
    socket.on("offering call", (data) => {
      const user = getUser(data.friendId);
      io.to(user?.socketId).emit("offering call", data);
    });

    // Cancel call
    socket.on("canceling call", (username) => {
      socket.broadcast.emit("canceling call", username);
    });

    // Send signal
    socket.on("sending signal", (payload) => {
      io.to(payload.userToSignal).emit("user joined", {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    });

    // Return signal
    socket.on("returning signal", (payload) => {
      io.to(payload.callerID).emit("receiving returned signal", {
        signal: payload.signal,
        id: socket.id,
      });
    });

    // When user disconnect
    socket.on("disconnect", () => {
      // Remove disconnected user
      removeUser(socket.id);

      // Return users
      io.emit("getUsers", users);

      // Remove user from room
      const roomID = socketToRoom[socket.id];
      let room = callUsers[roomID];

      if (room) {
        room = room.filter((id) => id !== socket.id);
        callUsers[roomID] = room;
      }

      // End call
      socket.broadcast.emit("callEnded");
    });
  });
};
