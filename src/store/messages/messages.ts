import {Message} from "../../types/Message";

const ADD_MESSAGE = "ADD_MESSAGE";
const INIT_MESSAGES = "INIT_MESSAGES";

// ACTIONS
export const addMessage = (message: Message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}

export const setMessage = (message: Array<Message>) => {
    return {
        type: INIT_MESSAGES,
        message
    }
}

type actionType = {
    type: string,
    message: Message | Array<Message>
}

const defaultMessages: Array<Message> = []

// REDUCER
export const messages = (state = defaultMessages, action: actionType) => {
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