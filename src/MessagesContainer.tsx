import * as React from 'react';
import { MessageItem } from "./MessageItem";
import useChat from "./useChat";
import {useParams} from "react-router-dom";

export const MessagesContainer = () => {
    const { roomId } = useParams();

    return (
        <div className="container m-2">

        </div>
    );
};