export class Message{
    message: string;
    date: Date;
    sender: string;
    constructor(message: string, date: Date, sender: string) {
        this.message = message;
        this.date = date;
        this.sender = sender;
    }

    send = () => {
        // Handle sending message
        console.log("Sending messages");
    }
}