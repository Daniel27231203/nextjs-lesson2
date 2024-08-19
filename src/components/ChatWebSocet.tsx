"use client";
import { useEffect, useState } from "react";
import scss from "./ChatWebsocet.module.scss";

interface IMessage {
  username: string;
  photo: string;
  message: string;
}

function ChatWebSocet() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newma, setNewma] = useState("");

  const initialisationWebSocket = () => {
    const ws = new WebSocket("wss://api.elchocrud.pro");
    ws.onopen = () => {
      console.log("ws connect");
    };
    ws.onmessage = (event) => {
      setMessages(JSON.parse(event.data));
    };
    ws.onerror = (error) => {
      console.log("🚀 ~ initialisationWebSocket ~ error:", error);
    };
    ws.onclose = () => {
      setTimeout(initialisationWebSocket, 500);
    };
    setSocket(ws);
  };

  function sendMessage() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      let newUser = {
        event: "message",
        username: "Daniel",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/DanielRadcliffe.jpg/1200px-DanielRadcliffe.jpg",
        message: newma,
      };
      socket.send(JSON.stringify(newUser));
      setNewma("");
    }
  }

  useEffect(() => {
    initialisationWebSocket();
  }, []);
  console.log("🚀 ~ ChatWebSocet ~ messages:", messages);

  return (
    <div className={scss.ChatWebSocet}>
      <div className="container">
        <div className={scss.content}>
          <h2>ChatWebSocket</h2>
          <div className={scss.de}>
            {messages.map((el, ind) => (
              <div
                key={ind}
                className={
                  el.username === "Daniel" ? scss.uuserDaniel : scss.uuserTitle
                }
              >
                <div
                  className={
                    el.username === "Daniel" ? scss.userDaniel : scss.userTitle
                  }
                >
                  <img src={el.photo} alt="img" />
                  <h1>{el.username}</h1>
                </div>
                <p>{el.message}</p>
              </div>
            ))}
          </div>
          <div className={scss.send}>
            <input
              onChange={(e) => setNewma(e.target.value)}
              placeholder="add message"
              type="text"
              value={newma}
            />
            <button onClick={() => sendMessage()}>send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWebSocet;
