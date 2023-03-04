import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../LoginPage/LoginPage";

export const App = (): JSX.Element => {
  // Not necessary but just testing
  const title = document.querySelector("head > title");
  if (title) {
    title.innerHTML = "Flashcard App";
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <header className="App-header">
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        }
      />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
};
