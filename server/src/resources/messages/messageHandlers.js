import Message from './messages.model.js'
import {uuid} from "uuidv4";

// eslint-disable-next-line import/no-anonymous-default-export
export default (io, socket, roomId) => {
    const createMessage = (data) => {
        const message = new Message({
            message: data.message,
            date: data.date,
            sender: data.sender,
            _id: uuid(),
            roomId: roomId
        });

        message.save()
            .then((result) => {
                const msg = {
                    message: result.message,
                    sender: result.sender,
                    date: result.date,
                    id: result.id,
                    roomId: roomId
                }
                // socket.to(roomId).emit("msg:new", msg);
                io.in(roomId).emit("msg:new", msg);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    socket.on("msg:create", createMessage);
}