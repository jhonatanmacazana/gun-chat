import GUN from "gun/gun";
import SEA from "gun/sea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { SECRET_KEY } from "@/lib/constants";
import { gun } from "@/lib/gun";
import { Message } from "@/lib/types";
import { user } from "@/modules/auth/user";
import { useAuthStore } from "@/modules/auth/useAuthStore";

import { ChatMessage } from "./ChatMessage";
import { Login } from "./Login";

type FormData = {
  message: string;
};

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  return {
    messages,
    pushMessage: (message: Message) => {
      // validate if message is already in the list
      if (messages.some(m => m.who === message.who && m.when === message.when)) {
        return;
      }

      setMessages(old => [...old.slice(-100), message].sort((a, b) => a.when! - b.when!));
    },
  };
};

export const Chat = () => {
  const { username } = useAuthStore();
  const { register, handleSubmit, reset, watch } = useForm<FormData>();

  const { messages, pushMessage } = useMessages();

  useEffect(() => {
    gun
      .get("chat")
      .map()
      .once(async (data, id) => {
        if (!data) return;

        const message: Message = {
          id,
          // @ts-ignore
          who: await gun.user(data).get("alias"),
          what: (await SEA.decrypt(data.what, SECRET_KEY)) + "",
          // @ts-ignore
          when: GUN.state.is(data, "what"),
        };

        if (message.what) {
          pushMessage(message);
        }
      });

    return () => {
      gun.get("chat").off();
    };
  }, []);

  const sendMessage = async (data: FormData) => {
    const encryptedMessage = await SEA.encrypt(data.message, SECRET_KEY);
    const message = user.get("all").set({ what: encryptedMessage });
    const index = new Date().toISOString();
    gun.get("chat").get(index).put(message);

    reset();
  };

  const messageWatcher = watch("message");

  return (
    <div>
      {username ? (
        <>
          <form onSubmit={handleSubmit(sendMessage)}>
            <input
              maxLength={100}
              placeholder="Type a message..."
              type="text"
              {...register("message")}
            />
            <button type="submit" disabled={!messageWatcher}>
              💥
            </button>
          </form>
          <main>
            {[...messages]
              .sort((a, b) => (b.when || 0) - (a.when || 0))
              .map(m => (
                <ChatMessage key={m.id} message={m} sender={username} />
              ))}
          </main>
        </>
      ) : (
        <main>
          <Login />
        </main>
      )}
    </div>
  );
};
