import axios from "axios";
import { useEffect, useState } from "react";

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
