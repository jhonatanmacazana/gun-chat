import { useState } from "react";

import { user } from "@/modules/auth/user";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    user.auth(username, password, ack => {
      if ("err" in ack && ack.err) {
        alert(ack.err);
      }
    });
  };

  const handleSignup = () => {
    user.create(username, password, ack => {
      if ("err" in ack && ack.err) {
        alert(ack.err);
        return;
      }

      handleLogin();
    });
  };

  return (
    <div>
      <label htmlFor="username">Username</label>
      <input
        minLength={3}
        maxLength={16}
        name="username"
        onChange={evt => setUsername(evt.target.value)}
        value={username}
      />

      <label htmlFor="password">Password</label>
      <input
        name="password"
        onChange={evt => setPassword(evt.target.value)}
        value={password}
        type="password"
      />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};
