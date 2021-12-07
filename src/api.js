import axios from 'axios';

export default axios.create({
    baseURL: `http://localhost:3002/`
});

export const WEBSOCKET = "http://127.0.0.1:3001";
