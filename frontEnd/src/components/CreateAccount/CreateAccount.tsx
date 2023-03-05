import React, { useState } from "react";
import { AuthContext } from "../../contexts";
import { create_user_function } from "../../utils";
import { LoadingModal } from "../LoadingModal/LoadingModal";

export const CreateAccount = (): JSX.Element => {
  const { setAuth } = React.useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newUser = { name, email, password, username, cards: [] };
    setLoading(true);
    create_user_function(newUser, setAuth);
    setLoading(false);
    // TODO: After this, navigate us to profile page

    console.log(newUser);
    setName("");
    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <>
      {loading ? (
        <LoadingModal />
      ) : (
        <div className="create-account-container">
          <form className="create-account" onSubmit={handleSubmit}>
            <h1 id="create-account-title">Create New Account</h1>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </>
  );
};
