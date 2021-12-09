import {Message} from "../../types/Message";

const ADD_MESSAGE: string = "ADD_MESSAGE";
const INIT_MESSAGES: string = "INIT_MESSAGES";

export const addMessage = (message: Message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}

export const setMessage = (message: Message[]) => {
    return {
        type: INIT_MESSAGES,
        message
    }
}

type ACTIONTYPE  =
    | {type: string, message: Message}
    | {type: string, message: Message[]};

const defaultMessages: Message[] = []

export const messages = (state: Message[] = defaultMessages, action: ACTIONTYPE ) => {
    switch (action.type){
        case ADD_MESSAGE:
            return [
                ...state,
                action.message
            ];
        case INIT_MESSAGES:
            return action.message;
        default:
            return state;
    }
}