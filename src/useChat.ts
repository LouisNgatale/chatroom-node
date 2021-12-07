import {io} from "socket.io-client";
import API, {WEBSOCKET} from "./api";
import {useDispatch, useSelector} from "react-redux";
import {Message} from "./types/Message";
import {useEffect, useRef, useState} from "react";
import {addMessage, setMessage} from "./store/messages/messages";
import {Socket} from "socket.io";

interface RootState {
    messages: Array<Message>;
}
const NEW_CHAT_MESSAGE_EVENT = "msg:new";

const useChat = (roomId: string = "global") => {
    const messages  = useSelector((state: RootState) => state.messages);
    const socketRef = useRef();
    const [status, setStatus] = useState("🔴");
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        socketRef.current = io(WEBSOCKET, {
            query: { roomId },
        });

        console.log("Use effect rerun");

        // @ts-ignore
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: Message) => {
            dispatch(addMessage(message));
            console.log("New message");
        });

        // @ts-ignore
        socketRef.current.on("connect", () => {
            setStatus("🟢");
            API.get(`/messages/${roomId}`,)
                .then(function (response) {
                    dispatch(setMessage(response.data.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        });

        return () => {
            // @ts-ignore
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (message: Message) => {
        // @ts-ignore
        socketRef.current.emit("msg:create", message);
    };

    return { messages, status,  sendMessage };
}

export default useChat