import React from 'react';
import {NewMessage} from "./NewMessage";
import {MessagesContainer} from "./MessagesContainer";

function App() {
  return (
    <div className="App">
      <div className="container">
          <NewMessage/>
          <MessagesContainer/>
      </div>
    </div>
  );
}

export default App;