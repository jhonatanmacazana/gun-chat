import { user } from "@/modules/auth/user";
import { useAuthStore } from "@/modules/auth/useAuthStore";

export const Header = () => {
  const { username } = useAuthStore();

  const signout = () => {
    user.leave();
    useAuthStore.getState().setUsername("");
  };

  return (
    <header>
      <h1>gun chat</h1>
      {username ? (
        <>
          <div>
            <span>
              Hello <strong>{username}</strong>
            </span>
            <img
              src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
              alt="avatar"
              width="20px"
            />
          </div>

          <button onClick={signout}>Sign Out</button>
        </>
      ) : (
        <h3>Gun.js Chat</h3>
      )}
    </header>
  );
};
