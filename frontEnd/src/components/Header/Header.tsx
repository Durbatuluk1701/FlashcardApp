import React from "react";
import { Link } from "react-router-dom";

export const Header = (): JSX.Element => {
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
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
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
