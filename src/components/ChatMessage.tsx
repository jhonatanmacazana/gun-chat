import { Message } from "../lib/types";

type ChatMessageProps = {
  message: Message;
  sender: string;
};

const ChatMessage = ({ message, sender }: ChatMessageProps) => {
  const messageClass = message.who === sender ? "sent" : "received";

  const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;

  const ts = new Date(message.when!);

  return (
    <div
      className={`message ${messageClass}`}
      style={{
        margin: "0.5rem 0.75rem",
        border: "1px solid",
        borderRadius: "6px",
        padding: "0.25rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={avatar} alt="avatar" width="20px" />
        <time style={{ marginLeft: "1rem", color: "gray" }}>{ts.toLocaleTimeString()}</time>
      </div>

      <p>{message.what}</p>
    </div>
  );
};

export default ChatMessage;
