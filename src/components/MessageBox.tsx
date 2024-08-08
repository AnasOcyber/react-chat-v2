import { FormEvent, useState, useEffect, useRef } from "react";
import socket from "../services/socket";

const MessageBox = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", { user: "User1" });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("stopTyping", { user: "User1" });
    }, 2000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", { message });
    setMessage("");
    setIsTyping(false);
    socket.emit("stopTyping", { user: "User1" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping();
        }}
        value={message}
      />
      <button>Submit</button>
    </form>
  );
};

export default MessageBox;
