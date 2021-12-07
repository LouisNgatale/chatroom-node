import React from 'react';
import { Routes, Route, } from "react-router-dom";
import Home from "./home/Home";

import {ChatRoom} from "./chatroom/ChatRoom";

function App() {
    return (
      <div className="App">
          <Routes>
              <Route  path="/" element={<Home />} />
              <Route  path="/:roomId" element={<ChatRoom />} />
          </Routes>
      </div>
  );
}

export default App;