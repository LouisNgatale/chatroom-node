import {combineReducers, createStore} from 'redux'
import {messages} from "./messages/messages";

const reducers = combineReducers({
    messages
})

const store = createStore(reducers)

export default store