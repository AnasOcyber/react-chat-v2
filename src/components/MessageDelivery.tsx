import { Message } from "../App";

interface Props {
  message: Message | undefined;
}

const MessageDelivery = ({ message }: Props) => {
  return (
    <>
      {message && (
        <p>
          {message.clientId}: {message.message}
        </p>
      )}
    </>
  );
};

export default MessageDelivery;
