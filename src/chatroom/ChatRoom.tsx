import * as React from 'react';
import {NewMessage} from "../NewMessage";

export function ChatRoom(): JSX.Element {
    return (
        <div>
            <div className="container">
                <NewMessage/>
            </div>
        </div>
    );
}