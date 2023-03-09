import React from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { AuthContext, ModalContext } from "../../contexts";
import { LoadingModal } from "../LoadingModal/LoadingModal";

export const LoginPage = (): JSX.Element => {
  const { authenticated, updateAuth } = React.useContext(AuthContext);
  const modalCont = React.useContext(ModalContext);
  const [loading, setLoading] = React.useState<boolean>(false);

  const searchParams = useSearchParams()[0];

  const redirect = searchParams.get("redirect");

  console.log(redirect);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const username =
      document.querySelector<HTMLInputElement>("#login-username")?.value;
    const pwd =
      document.querySelector<HTMLInputElement>("#login-password")?.value;
    if (username && pwd) {
      console.log("making call");
      setLoading(true);
      updateAuth(username, pwd).then((res) => {
        setLoading(false);
        switch (res.res) {
          case "Ok":
            break;
          case "Err":
            modalCont.setModalTitle("Error Logging In");
            modalCont.setModalMessage(res.val);
            modalCont.setShowModal(true);
        }
      });
    } else if (!username) {
      throw new Error("Impossible, 'username' must be filled out");
    } else if (!pwd) {
      throw new Error("Impossible, 'username' must be filled out");
    }
  };

  return (
    <div className="login-container">
      {loading ? (
        <LoadingModal />
      ) : authenticated ? (
        redirect ? (
          <Navigate to={redirect} />
        ) : (
          <Navigate to={"/profile"} />
        )
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          {
            //TODO: Make it so you can use username or email to login
          }
          <label>
            Username:
            <input
              id="login-username"
              type="username"
              className="login-input"
              required
            />
          </label>
          <label>
            Password:
            <input
              id="login-password"
              type="password"
              className="login-input"
              required
            />
          </label>
          <div className="login-bottom-row">
            <Link id="create-account" to={"/create-account"}>
              Create Account
            </Link>
            <button id="login-submit" type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
