import formatRelative from "date-fns/formatRelative";

import { Message } from "@/lib/types";

export const ChatMessage = ({ message, sender }: { message: Message; sender: string }) => {
  const messageClass = message.who === sender ? "sent" : "received";

  const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;
  const ts = formatRelative(message.when!, new Date());

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
        <time style={{ marginLeft: "1rem", color: "gray" }}>{ts}</time>
      </div>

      <p>{message.what}</p>
    </div>
  );
};
