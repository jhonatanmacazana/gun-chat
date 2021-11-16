type Message = {
  who: any;
  what: any;
  when: any;
};

type ChatMessageProps = {
  message: Message;
  sender: string;
};

const ChatMessage = ({ message, sender }: ChatMessageProps) => {
  const messageClass = message.who === sender ? "sent" : "received";

  const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;

  const ts = new Date(message.when);

  return (
    <div className={`message ${messageClass}`}>
      <img src={avatar} alt="avatar" width="20px" />
      <div className="message-text">
        <p>{message.what}</p>

        <time>{ts.toLocaleTimeString()}</time>
      </div>
    </div>
  );
};

export default ChatMessage;
