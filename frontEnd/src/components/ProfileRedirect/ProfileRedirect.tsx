import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts";

export const ProfileRedirect = (): JSX.Element => {
  const { authenticated } = React.useContext(AuthContext);

  // TODO: Handle when we navigate somewhere with no user!
  return (
    <>
      {authenticated ? (
        <Navigate to={`/profile/${authenticated.username}`} />
      ) : (
        <></>
      )}
    </>
  );
};
