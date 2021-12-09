import {io, Socket} from "socket.io-client";
import API, {WEBSOCKET} from "./api";
import {useDispatch, useSelector} from "react-redux";
import {Message} from "./types/Message";
import React, {useEffect, useRef, useState} from "react";
import {addMessage, setMessage} from "./store/messages/messages";

interface RootState {
    messages: Array<Message>;
}
const NEW_CHAT_MESSAGE_EVENT: string = "msg:new";
const CONNECT: string = "connect";
const MESSAGE_CREATE: string = "msg:create";

const useChat = (roomId: string = "global") => {
    const messages  = useSelector((state: RootState) => state.messages);
    const socketRef = React.useRef<Socket | null>(null);
    const [status, setStatus] = React.useState("🔴");
    const dispatch = useDispatch();

    useEffect(() => {
        // Make sure socket instance is initialized once
        if(socketRef.current === null){
            socketRef.current = io(WEBSOCKET, {
                query: { roomId },
            });
        }

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: Message) => {
            dispatch(addMessage(message));
        });

        socketRef.current.on("disconnect", () => {
            setStatus("🔴");
        });

        socketRef.current.on(CONNECT, () => {
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
            if(socketRef.current !== null){
                socketRef.current.disconnect();
                setStatus("🔴");
            }
        };
    }, [roomId]);

    const sendMessage = (message: Message) => {
        if(socketRef.current !== null){
            socketRef.current.emit(MESSAGE_CREATE, message);
        }
    };

    return { messages, status,  sendMessage } as const;
}

export default useChat