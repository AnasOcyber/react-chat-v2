import { useEffect, useState } from "react";
import socket from "./services/socket";
import MessageBox from "./components/MessageBox";

const App = () => {
  const [messageSent, setMessageSent] = useState("");
  const [joined, setJoined] = useState(null);
  const [left, setLeft] = useState(null);

  useEffect(() => {
    socket.on("reply", (payload) => setMessageSent(payload));

    return () => {
      socket.off("reply");
    };
  }, []);

  useEffect(() => {
    socket.on("user-joined", (payload) => setJoined(payload));

    return () => {
      socket.off("user-joined");
    };
  }, []);

  useEffect(() => {
    socket.on("user-left", (payload) => setLeft(payload));

    return () => {
      socket.off("user-left");
    };
  }, []);
  return (
    <>
      <MessageBox />
      <div>{messageSent}</div>
      <div>{joined}</div>
      <div>{left}</div>
    </>
  );
};

export default App;
