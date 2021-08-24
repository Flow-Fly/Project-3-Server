
const Room = require("../models/Room");
const Connected = require('../models/Connected') 
/* ---------- Utils functions ------------ */

//SocketId is always changing (on each page refresh)
//to send private message we need to persist the user ids

//function to add a new user in the users array only if he doesn't exist yet
//if it already exists, update the socketId associated to the userId
const addUser = async (userId, socketId) => {

  const foundUser = await Connected.find({user : userId})

  //if the userId already exists in the users array, update the socketId associated
  //if not add it 
  if (foundUser.length) {
    await Connected.findOneAndUpdate({user: userId}, {socket: socketId}, {new: true})
  } 
  else {
    const newConnection = await Connected.create({
      user: userId,
      socket: socketId
    })
  }
  const users = await Connected.find().populate("user").select("-password")
 
  return users
};

//function to remove a user that just disconnected
const removeUser = async socketId => {

  await Connected.findOneAndDelete({socket: socketId})

  const users = await Connected.find().populate("user").select("-password")

  return users
};

//get the socketId associated to an userId in the user array
const getSocketId = async userId => {

  const user = await Connected.find({user: userId})

  if(user.length) return user[0].socket

  return 'disconnected'
};

/*------------ Socket functions ------------*/

module.exports = (io, socket) => {
    //connection management, add new user and send the new users array to all clients
    const addUserOrder = async userId => {
        const users = await addUser(userId, socket.id)

        io.emit("getUsers", users)
    }

socket.on("addUser", addUserOrder);

    //manage messages flow
    const sendOrder = async ({room, senderId, senderImg, receiverId, content}) => {
 
        const receiverSocketId = await getSocketId(receiverId)

        if(receiverSocketId === 'disconnected'){

          const foundRoom = await Room.findById(room._id)

          const notifications = [...foundRoom.notifications, receiverId]
          
          const roomUpdated = await Room.findByIdAndUpdate(room._id, {
              notifications
          }, {new: true})

          return console.log('friend not connected')
        } 
        console.log('RECEIVER SOCKET ID ', receiverSocketId)
        io.to(receiverSocketId).emit("receive", {
            room,
            senderId,
            content,
            senderImg,
          });
    }

socket.on("send", sendOrder);

    //disconnection management, remove disconnected user and send the new users array to all clients
    const disconnectedOrder = async () => {
        
        const users = await removeUser(socket.id);
        
        socket.disconnect(0)
    
        io.emit("getUsers", users);
    }

socket.on("disconnected", disconnectedOrder)

  socket.on("disconnect", (reason) => {
    console.log('Socket has disconnected')
    disconnectedOrder()
  });
}