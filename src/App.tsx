import { useEffect, useState } from "react";
import socket from "./services/socket";
import MessageBox from "./components/MessageBox";
import MessageDelivery from "./components/MessageDelivery";
import ActiveUsersList from "./components/ActiveUsersList";
import MessageList from "./components/MessageList";

export interface Message {
  clientId: string;
  message: string;
}

const App = () => {
  const [messageSent, setMessageSent] = useState<Message>();

  useEffect(() => {
    socket.on("reply", (delivery) => setMessageSent(delivery));

    return () => {
      socket.off("reply");
    };
  }, []);

  return (
    <>
      <MessageList />
      <MessageBox />
      <MessageDelivery message={messageSent} />
      <ActiveUsersList />
    </>
  );
};

export default App;
