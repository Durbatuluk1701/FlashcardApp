import React from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { LoadingModal } from "../LoadingModal/LoadingModal";

export const LoginPage = (): JSX.Element => {
  const { authenticated, updateAuth } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <div className="login-container">
      {loading ? (
        <LoadingModal />
      ) : authenticated ? (
        <Navigate to={"/profile"} />
      ) : (
        <form className="login-form">
          {
            //TODO: Make it so you can use username or email to login
          }
          <label>
            Username:
            <input
              id="login-username"
              type="username"
              className="login-input"
            />
          </label>
          <label>
            Password:
            <input
              id="login-password"
              type="password"
              className="login-input"
            />
          </label>
          <div className="login-bottom-row">
            <Link id="create-account" to={"/create-account"}>
              Create Account
            </Link>
            <button
              id="login-submit"
              onClick={(e) => {
                e.preventDefault();
                const username =
                  document.querySelector<HTMLInputElement>(
                    "#login-username"
                  )?.value;
                const pwd =
                  document.querySelector<HTMLInputElement>(
                    "#login-password"
                  )?.value;
                console.log("TEST", username, pwd);
                if (username && pwd) {
                  console.log("making call");
                  setLoading(true);
                  updateAuth(username, pwd).then(() => {
                    setLoading(false);
                  });
                } else if (!username) {
                  // TODO
                  console.error("INVALID username");
                } else if (!pwd) {
                  // TODO
                  console.error("INVALID PWD");
                }
              }}
              className="login-button"
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
