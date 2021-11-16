import GUN, { SEA } from "gun/gun";
import { FormEventHandler, useEffect, useState } from "react";

import { user } from "../lib/user";
import { useAuthStore } from "../modules/auth/useAuthStore";
import ChatMessage from "./ChatMessage";
import Login from "./Login";

const db = GUN();
const key = "#foo";

const Chat = () => {
  const { username } = useAuthStore();

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    db.get("chat")
      .map()
      .once(async (data, id) => {
        if (data) {
          const message = {
            // @ts-ignore
            who: db.user(data).get("alias"),
            what: (await SEA.decrypt(data.what, key)) + "",
            // @ts-ignore
            when: GUN.state.is(data, "what"),
          };

          if (message.what) {
            setMessages(old => [...old.slice(-100), message]);
          }
        }
      });
  }, []);

  const sendMessage: FormEventHandler<HTMLFormElement> = async evt => {
    evt.preventDefault();
    const secret = await SEA.encrypt(newMessage, key);
    const message = user.get("all").set({ what: secret });
    const index = new Date().toISOString();
    db.get("chat").get(index).put(message);
    setNewMessage("");
  };

  return (
    <div>
      {username ? (
        <>
          <main>
            {messages.map(m => (
              <ChatMessage key={m.when} message={m} sender={username} />
            ))}
          </main>
          <form onSubmit={sendMessage}>
            <input
              maxLength={100}
              onChange={evt => setNewMessage(evt.target.value)}
              placeholder="Type a message..."
              type="text"
              value={newMessage}
            />
            <button type="submit" disabled={!newMessage}>
              💥
            </button>
          </form>
        </>
      ) : (
        <main>
          <Login />
        </main>
      )}
    </div>
  );
};

export default Chat;
