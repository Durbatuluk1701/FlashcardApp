import React from "react";
import ReactDOM from "react-dom/client";
import {
  App,
  CreateAccount,
  Header,
  LoginPage,
  NotFoundLanding,
  Profile,
  ProfileRedirect,
  SpecificSet,
} from "./components";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./components/index.css";
import { Sets } from "./components/Sets/Sets";
import { SetsRedirect } from "./components/Sets/SetsRedirect";
import { NewSet } from "./components/NewSet/NewSet";
import { AuthProvider, ModalProvider } from "./contexts";
import { Modal } from "./components/Modal/Modal";

const Root = (): JSX.Element => {
  return (
    <>
      <ModalProvider>
        <AuthProvider>
          <Header />
          <Modal />
          <Outlet />
        </AuthProvider>
      </ModalProvider>
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
        path: "/sets",
        element: <SetsRedirect />,
      },
      {
        path: "/new-set",
        element: <NewSet />,
      },
      {
        path: "/sets/:username/:setid",
        element: <SpecificSet />,
      },
      {
        path: "/sets/:username",
        element: <Sets />,
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/profile",
        element: <ProfileRedirect />,
      },
      {
        path: "*",
        element: <NotFoundLanding />,
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
