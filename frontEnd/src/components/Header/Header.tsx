import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts";

export const Header = (): JSX.Element => {
  const { logOut, authenticated } = React.useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-logo">
        <Link to={"/"}>Flashcard App</Link>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>

          {authenticated ? (
            <>
              <li>
                <Link to={"/sets"}>Sets</Link>
              </li>
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li>
                <Link to="/" onClick={() => logOut()}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
          {/* <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
