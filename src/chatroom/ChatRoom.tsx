import * as React from 'react';
import {NewMessage} from "../NewMessage";
import {MessagesContainer} from "../MessagesContainer";

export function ChatRoom() {
    return (
        <div>
            <div className="container">
                <NewMessage/>
                {/*<MessagesContainer/>*/}
            </div>
        </div>
    );
};