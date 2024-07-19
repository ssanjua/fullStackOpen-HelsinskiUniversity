import React from "react";
import Toggable from "./Toggable";

const LoginForm = ({
  handleSubmit,
  username,
  password,
  handlePasswordChange,
  handleUsernameChange,
}) => {
  return (
    <Toggable buttonLabel="show login" cancelLabel="cancel">
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </Toggable>
  );
};

export default LoginForm;
