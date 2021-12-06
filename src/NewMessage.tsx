// @flow
import * as React from 'react';
import './app.css'
import styled from "styled-components";
import {AiOutlineSend} from "react-icons/all";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addMessage} from "./store/messages/messages";
import {Message} from "./types/Message";
import { io } from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";

export function NewMessage() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const socket = io(ENDPOINT);

    useEffect(() => {
        socket.on("new_message", (data) => {
            dispatch(addMessage(data));
        })
    }, []);

    const send = () => {
        if(message.length > 0 && name.length > 0){
            let time = new Date();

            const newMessage: Message = {
                message: message,
                sender: name,
                date: time.toDateString()
            }

            socket.emit("send_message", newMessage);

            console.log(newMessage);

            setMessage("");
        }
    }

    return (
        <div>
            <div className="container">
                <div className="new-message">
                    <Input placeholder="Name" type="text" onChange={e => setName(e.target.value)} value={name}/>
                    <MessageInput placeholder="Message" type="text" onChange={e => setMessage(e.target.value)}
                                  value={message}/>
                    <Button onClick={(e) => send()}><AiOutlineSend/></Button>
                </div>
            </div>
        </div>
    );
}

const Input = styled.input`
  padding: 8px 8px;
  border: 2px solid #4b4b4b;
  outline: none;
  width: 160px;
  margin: 0 3px;
  
  :focus{
    border: 2px solid greenyellow;
  }
`;

const Button = styled.button`
  margin: 0 3px;
  width: 100px;
  border: 0;
  background: #4b4b4b;
  color: white;
  
  :hover{
    background: greenyellow;
    color: #4b4b4b;
  }
`;

const MessageInput = styled(Input)`
  width: 100%;
  
  :focus{
    border: 2px solid greenyellow;
  }
`;