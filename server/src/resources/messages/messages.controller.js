import Message from "./messages.model.js";

export const init = async(req, res) => {
    console.log("Getting messages")

    const messages = await Message.find({ roomId: req.params.roomId});

    const msgs = messages.map(message => {
        return {
            message: message.message,
            sender: message.sender,
            date: message.date,
            id: message._id
        };
    });

    res.status(200).json({
        data: msgs
    });
}


