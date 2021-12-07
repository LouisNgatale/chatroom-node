import mongoose from 'mongoose'

const uri = "mongodb+srv://louis:test12345@messages.syvlu.mongodb.net/room-chat?retryWrites=true&w=majority";

export const connect = (url = uri, opts = {}) => {
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("Connected to db")
        })
        .catch(err => console.log(`Error ${err}`));
}



