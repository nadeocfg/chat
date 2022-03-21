import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [msg, setMsg] = useState('');
  const socket = useRef<WebSocket>();

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:5000/');
  }, []);

  const sendMsg = () => {
    socket.current?.send(msg);
  };

  const changeMsg = (e: any) => {
    setMsg(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={msg} onChange={changeMsg} />

        <button onClick={sendMsg}>send msg</button>
      </header>
    </div>
  );
}

export default App;
