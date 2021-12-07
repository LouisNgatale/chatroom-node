import Message from './messages.model.js'
import {uuid} from "uuidv4";

const ROOM = "room_1";
// eslint-disable-next-line import/no-anonymous-default-export
export default (io, socket) => {
    const createMessage = (data) => {
        const message = new Message({
            message: data.message,
            date: data.date,
            sender: data.sender,
            _id: uuid()
        });

        message.save()
            .then((result) => {
                const msg = {
                    message: result.message,
                    sender: result.sender,
                    date: result.date,
                    id: result.id
                }
                socket.to(ROOM).emit("mgs:new", msg);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    socket.on("msg:create", createMessage);
}