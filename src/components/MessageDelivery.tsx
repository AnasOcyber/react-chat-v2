import { useEffect, useState } from "react";
import { Message } from "../App";
import socket from "../services/socket";

interface Props {
  message: Message | undefined;
}

const MessageDelivery = ({ message }: Props) => {
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    const handleDeliveryConfirmation = () => {
      setDelivered(true);
      const timer = setTimeout(() => {
        setDelivered(false);
      }, 2000);

      return () => clearTimeout(timer);
    };

    socket.on("deliveryConfirmation", handleDeliveryConfirmation);

    return () => {
      socket.off("deliveryConfirmation");
    };
  }, [message]);

  return <>{delivered && <p>Message delivered</p>}</>;
};

export default MessageDelivery;
