import { FormEvent, useEffect, useState } from "react";
import socket from "../services/socket";

const MessageBox = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("reply", (payload) => console.log(payload));

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", { message });
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      />
      <button>Submit</button>
    </form>
  );
};

export default MessageBox;
