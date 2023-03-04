import React from "react";

export const LoginPage = (): JSX.Element => {
  return (
    <div className="login-container">
      <form className="login-form">
        <label>
          Email:
          <input type="email" className="login-input" />
        </label>
        <label>
          Password:
          <input type="password" className="login-input" />
        </label>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};
