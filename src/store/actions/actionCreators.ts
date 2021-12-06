import {SEND_MESSAGE} from "./actions";


export function sendMessage(message: any){
    return (dispatch: any) => {
        dispatch({type: SEND_MESSAGE, message})
    }
}