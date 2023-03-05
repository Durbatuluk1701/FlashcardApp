import React from "react";
import ReactDOM from "react-dom/client";
import { App, Header, LoginPage } from "./components";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./components/index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { CreateAccount } from "./components/CreateAccount/CreateAccount";
import { Profile } from "./components/Profile/Profile";

const Root = (): JSX.Element => {
  return (
    <>
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
