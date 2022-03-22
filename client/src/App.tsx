import { useEffect, useRef, useState } from 'react';
import './App.scss';

interface Message {
  date: string;
  text: string;
  userId: number;
}

function App() {
  const [msg, setMsg] = useState('');
  const [msgArr, setMsgArr] = useState<Message[]>([]);
  const socket = useRef<WebSocket>();
  const userId = useRef<number>();

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:5000/');
    userId.current = Date.now();
  }, []);

  if (socket.current) {
    socket.current.onmessage = (ws: any) => {
      console.log(msgArr);
      const newEl = JSON.parse(ws.data);
      const newArr = [...msgArr, newEl];
      console.log(newArr);

      setMsgArr(newArr);
    };
  }

  const sendMsg = () => {
    const data = {
      text: msg,
      date: new Date(),
      userId: userId.current,
    };

    socket.current?.send(JSON.stringify(data));
  };

  const changeMsg = (e: any) => {
    setMsg(e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="messenger">
          <h1>Messenger</h1>

          <div className="msg-box">
            {msgArr.map((item) => (
              <div className="msg-box__item" key={item.date}>
                {item.text}

                <div className="date">{item.date}</div>
              </div>
            ))}
          </div>
          <div className="actions">
            <input type="text" value={msg} onChange={changeMsg} />

            <button onClick={sendMsg}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
