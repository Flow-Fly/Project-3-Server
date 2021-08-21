/* ---------- Utils functions ------------ */

//SocketId is always changing (on each page refresh)
//to send private message we need to persist the user ids
let users = [];

//function to add a new user in the users array only if he doesn't exist yet
//if it already exists, update the socketId associated to the userId
const addUser = (userId, socketId) => {
  const foundUser = users.find((user) => {
    return user._id === userId;
  });

  //if the userId already exists in the users array, update the socketId associated
  //if not add it 
  if (foundUser) {
    foundUser.socket = socketId;
  } else {
    users.push({ _id: userId, socket: socketId });
  }
};

//function to remove a user that just disconnected
const removeUser = (socketId) => {
  
  users = users.filter((user) => user.socket !== socketId);
};

//get the socketId associated to an userId in the user array
const getSocketId = (userId) => {
  const user = users.find((user) => user._id === userId);
  return user.socket;
};

/*------------ Socket functions ------------*/

module.exports = (io, socket) => {
    //connection management, add new user and send the new users array to all clients
    const addUserOrder = userId => {
        addUser(userId, socket.id)

        io.emit("getUsers", users)
    }

socket.on("addUser", addUserOrder);

    //manage messages flow
    const sendOrder = ({senderId, senderImg, receiverId, content}) => {
        io.to(getSocketId(receiverId)).emit("receive", {
            senderId,
            content,
            senderImg,
          });
    }

socket.on("send", sendOrder);

    //disconnection management, remove disconnected user and send the new users array to all clients
    const disconnectedOrder = () => {
        removeUser(socket.id);

        socket.disconnect(0)
    
        io.emit("getUsers", users);
    }

socket.on("disconnected", disconnectedOrder)
}