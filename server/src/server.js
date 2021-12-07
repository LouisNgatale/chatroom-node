import {Server} from "socket.io";
import express from 'express';
import { connect } from './db.js';
import cors from 'cors';
import messagesRouter from './resources/messages/messages.router.js'
import http from "http";
import registerMessageHandlers from './resources/messages/messageHandlers.js';

// Express server for normal api endpoints
export const app = express();
// Http server for websocket endpoints
const server = http.createServer(app);
const ROOM = "room_1";
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});

const onConnection = async (socket) => {
    await socket.join(ROOM);
    registerMessageHandlers(io, socket);
}

export const start = async() => {
    try{
        app.use(cors());

        io.on("connection", onConnection);

        app.use("/messages", messagesRouter)

        await connect();

        app.listen(3002, () => {
            console.log(`Http Server started on http://localhost:3002`)
        })
        server.listen(3001, () => {
            console.log(`Websocket server started on http://localhost:3001`)
        });
    }catch (e) {
        console.error(e);
    }
}