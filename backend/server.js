// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config Setup
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

// Connecting to Database
const connectDatabase = require("./database/connectDatabase");
connectDatabase();


// Models Imports
const User = require("./models/userModel");
const Message = require('./models/MessageModel');


// Server Listening
const http=require("http");
const socketIO = require("socket.io");
const app = require("./app");
const server = http.createServer(app);

 

const io=socketIO(server);


async function getLastMessagesFromRoom(room){
  let roomMessages = await Message.aggregate([
    {$match: {to: room}},
    {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}
  ])
  return roomMessages;
}


function sortRoomMessagesByDate(messages){
  return messages.sort(function(a, b){
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    date1 = date1[2] + date1[1] + date1[0]
    date2 =  date2[2] + date2[1] + date2[0];

    return date1 < date2 ? -1 : 1
  })
}


// socket connection

io.on('connection', (socket)=> {

  console.log("New Connection");

  socket.on('new-user', async ()=> {

    const members = await User.find();

    socket.emit('new-user', members);

  })

  socket.on('join-room', async(newRoom, previousRoom)=> {

    socket.join(newRoom);
    socket.leave(previousRoom);

    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);

    socket.emit('room-messages', roomMessages)
  })

  socket.on('message-room', async(room, content, sender, time, date) => {

    const newMessage = await Message.create({content, from: sender, time, date, to: room});
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    
    io.to(room).emit('room-messages', roomMessages);
        
  })

})

const PORT = process.env.PORT || process.env.DEV_PORT;

server.listen(PORT, () => {
  console.log(`Server is working`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
