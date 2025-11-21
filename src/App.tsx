import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.tsx";
import VideoRoom from "./components/VideoRoom/VideoRoom.tsx";

function App() {
  const [joined, setJoined] = useState<boolean>(false);

  return (
    <div className="App">
      <Header />
      {!joined && <button onClick={() => setJoined(true)}>JOIN ROOM</button>}
      {joined && <VideoRoom setJoined={setJoined} />}
    </div>
  );
}

export default App;
