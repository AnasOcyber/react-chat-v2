import { Message } from "../App";

interface Props {
  clientId: string | undefined;
  message: Message | undefined;
}

const MessageDelivery = ({ clientId, message }: Props) => {
  if (message?.clientId === clientId)
    return <>{message && <p>Message sent</p>}</>;
  return <>{message && <p>Message recieved</p>}</>;
};

export default MessageDelivery;
