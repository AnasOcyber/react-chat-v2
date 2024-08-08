interface Props {
  isTyping: boolean;
}

const TypingIndicator = ({ isTyping }: Props) => {
  if (isTyping) return <div>typing...</div>;
};

export default TypingIndicator;
