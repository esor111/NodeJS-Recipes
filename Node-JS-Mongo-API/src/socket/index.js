import jwt from "jsonwebtoken";
import { ChatEventEnum } from "./constant.js";
import axios from "axios"

const mountJoinChatEvent = (socket) => {
  socket.on(ChatEventEnum.JOIN_CHAT_EVENT, (chatId) => {
    console.log(`User joined the chat 🤝. chatId: `, chatId);
    socket.join(chatId);
  });
};

const mountParticipantTypingEvent = (socket) => {
  socket.on(ChatEventEnum.TYPING_EVENT, (chatId) => {
    socket.in(chatId).emit(ChatEventEnum.TYPING_EVENT, chatId);
  });
};

const mountParticipantStoppedTypingEvent = (socket) => {
  socket.on(ChatEventEnum.STOP_TYPING_EVENT, (chatId) => {
    socket.in(chatId).emit(ChatEventEnum.STOP_TYPING_EVENT, chatId);
  });
}; 

const InitializeSocketIO = (io) => {
  return io.on("connection", async (socket) => {
    try {
      // const token = socket.handshake.auth?.token;
      // if (token) {
      //   token = socket.handshake.auth?.token;
      // }

      const decodedToken = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcyMCwia2FoYUlkIjoiVS04QzY5NUUiLCJyb2xlIjp7ImlkIjoxLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDA0OjE4OjAxLjg1NloiLCJ0eXBlIjoicm9sZXMiLCJ2YWx1ZSI6ImFkbWluIn0sImlhdCI6MTcwMTIyNjA5NiwiZXhwIjoxNzA5MDAyMDk2fQ.eDQ-4vcOf5u07Exmzue04cVEAR83QD-wHi8i5B5NBik"); // decode the token
      // retrieve the user
      if (!decodedToken) {
        throw new ApiError(401, "Un-authorized handshake. Token is invalid");
      }
      const url = 'http://localhost:3000/api/v2/users/profile';
      const headers = {
        'accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwMCwia2FoYUlkIjoiVS03QTE0RkEiLCJyb2xlIjp7ImlkIjoxLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDEwOjAzOjAxLjg1NloiLCJ0eXBlIjoicm9sZXMiLCJ2YWx1ZSI6ImFkbWluIn0sImlhdCI6MTY5NzE3OTc2MywiZXhwIjoxNjk5NzcxNzYzfQ.0eY1sbK2rQcfF9uhgTVnBe_DkRUFQyFgIkHykwmmjBs',
      };

      const userInfo =await axios({
        method: 'get',
        url,
        headers
      }).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
      // console.log({ userInfo })


      // console.log({ man: decodedToken.id })
      socket.user = decodedToken; // mount the user object to the socket
      socket.join(decodedToken?.id);
      socket.emit(ChatEventEnum.CONNECTED_EVENT);
      console.log("User connected 🗼. userId: ", decodedToken.id);

      mountJoinChatEvent(socket);
      mountParticipantTypingEvent(socket);
      mountParticipantStoppedTypingEvent(socket);

      socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
        console.log("user has disconnected 🚫. userId: " + decodedToken.id);
        if (decodedToken?._id) {
          socket.leave(decodedToken?._id);
        }
      });
    } catch (err) {
      socket.emit(
        ChatEventEnum.SOCKET_ERROR_EVENT,
        err?.message || "Something went wrong while connecting to the socket."
      );
    }
  });
};

const emitSocketEvent = (req, roomId, event, payload) => {
  req.app.get("io").in(roomId).emit(event, payload);
};

export { InitializeSocketIO, emitSocketEvent };