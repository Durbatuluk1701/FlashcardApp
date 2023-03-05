import React from "react";
import { useParams } from "react-router-dom";
import { User } from "../../contexts";
import { retrieve_user } from "../../utils";

export const Profile = (): JSX.Element => {
  const params = useParams();
  const username = params["username"];
  const [localUser, setLocalUser] = React.useState<User | undefined>(undefined);

  React.useEffect(() => {
    if (username) {
      retrieve_user(username).then((user) => {
        setLocalUser(user);
      });
    }
  }, [username]);

  // TODO: Handle when we navigate somewhere with no user!
  return (
    <div className="user-profile-container">
      <h1>{localUser?.username}'s Profile</h1>
      <div className="user-info-container">
        <img src="https://via.placeholder.com/150" alt="User avatar" />
        <div className="user-info">
          <p>
            <strong>Email:</strong> {localUser?.email}
          </p>
          <p>
            <strong>Name:</strong> {localUser?.name}
          </p>
        </div>
      </div>
      <div className="user-bio">
        <h2>User Sets</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut magna
          nisi. Vestibulum sodales purus nec libero convallis, eu tempor nisl
          iaculis.
        </p>
      </div>
    </div>
  );
};
