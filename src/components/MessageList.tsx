import axios from "axios";
import { useEffect, useState } from "react";
import socket from "../services/socket";

interface Message {
  message: string;
}

const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>();

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("http://localhost:3000/chats", {
        signal: controller.signal,
      })
      .then((res) => setMessages(res.data));

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    socket.on("reply", (newMessage: Message) => {
      messages ? setMessages([...messages, newMessage]) : [newMessage];
    });

    return () => {
      socket.off("reply");
    };
  }, [messages]);

  return (
    <>
      <h2>All Messages</h2>
      <ul>
        {messages?.map(({ message }, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </>
  );
};

export default MessageList;
