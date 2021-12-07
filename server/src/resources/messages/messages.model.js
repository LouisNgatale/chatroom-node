import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;