import {SEND_MESSAGE} from "../actions/actions";

const sendMessage = (state: any, action: any) => {
    const newState = {}
    Object.assign(newState, state, {
        message: "",
        date: "",
        sender: ""
    })
}

const rootReducer = (state: any, action: any) => {
    // TODO: Init state
    switch(action.type){
        case SEND_MESSAGE:
            return sendMessage(state, action);
        default:
            return state;
    }
}

export default rootReducer