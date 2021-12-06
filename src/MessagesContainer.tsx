import * as React from 'react';
import { MessageItem } from "./MessageItem";
import {useDispatch, useSelector} from "react-redux";
import { Message } from "./types/Message";
import {io} from "socket.io-client";
import {useEffect, useState} from "react";
import {setMessage} from "./store/messages/messages";
const ENDPOINT = "http://127.0.0.1:3001";

interface RootState {
    messages: Array<Message>;
}

export const MessagesContainer = () => {
    const messages  = useSelector((state: RootState) => state.messages);
    const socket = io(ENDPOINT);
    const [status, setStatus] = useState("🔴");
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on("connect", () => {
            setStatus("🟢");
        });
    }, []);

    useEffect(() => {
        socket.on("init", (data) => {
            // Initialize the state
            dispatch(setMessage(data));
        });
    }, []);

    return (
        <div className="container m-2">
            <div className="py-1">Messages { status }</div>
            {messages && messages.reverse().map(msg =>  <MessageItem key={msg.id} message={msg.message} date = {msg.date} sender={msg.sender} />) }
        </div>
    );
};