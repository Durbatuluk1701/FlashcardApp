import React from "react";
import { Link } from "react-router-dom";
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
        <>Already Authenticated</>
      ) : (
        <form className="login-form">
          <label>
            Email:
            <input id="login-email" type="email" className="login-input" />
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
                const email =
                  document.querySelector<HTMLInputElement>(
                    "#login-email"
                  )?.value;
                const pwd =
                  document.querySelector<HTMLInputElement>(
                    "#login-password"
                  )?.value;
                console.log("TEST", email, pwd);
                if (email && pwd) {
                  console.log("making call");
                  setLoading(true);
                  updateAuth(email, pwd).then(() => {
                    setLoading(false);
                  });
                } else if (!email) {
                  // TODO
                  console.error("INVALID EMAIL");
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
