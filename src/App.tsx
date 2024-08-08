import { useEffect, useState } from "react";
import socket from "./services/socket";
import MessageBox from "./components/MessageBox";
import MessageDelivery from "./components/MessageDelivery";
import ActiveUsersList from "./components/ActiveUsersList";
import MessageList from "./components/MessageList";
import TypingIndicator from "./components/TypingIndicator";

export interface Message {
  clientId: string;
  message: string;
}

const App = () => {
  const [messageSent, setMessageSent] = useState<Message>();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.on("reply", (delivery) => setMessageSent(delivery));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));

    return () => {
      socket.off("reply");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);

  return (
    <>
      <MessageList />
      <MessageBox />
      <TypingIndicator isTyping={isTyping} />
      <MessageDelivery message={messageSent} />
      <ActiveUsersList />
    </>
  );
};

export default App;
