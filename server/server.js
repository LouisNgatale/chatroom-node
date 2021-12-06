import {createServer} from "http";
import {Server} from "socket.io";
import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import Message from "./models/message.js"

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const ROOM = "room_1";

const uri = "mongodb+srv://louis:test12345@messages.syvlu.mongodb.net/room-chat?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("Connected to db")
    })
    .catch((err) => console.log(`Error ${err}`));

io.on("connection", async (socket) => {
    await socket.join(ROOM);

    // Emit messages
    await fetchMessages(socket.id);

    socket.on('send_message', (data) => {
        const message = new Message({
            message: data.message,
            date: data.date,
            sender: data.sender,
            _id: uuidv4()
        });

        message.save()
            .then((result) => {
                const msg = {
                    message: result.message,
                    sender: result.sender,
                    date: result.date,
                    id: result.id
                }
                socket.to(ROOM).emit("new_message", msg);
            })
            .catch((err) => {
                console.log(err);
            });

    });
});

async function fetchMessages (socketId)  {
    const messages = await Message.find({});

    const msgs = messages.map(message => {
        return {
            message: message.message,
            sender: message.sender,
            date: message.date,
            id: message._id
        };
    });

    io.to(socketId).emit("init", msgs);
}

httpServer.listen(3001);