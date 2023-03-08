import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../contexts";
import { get_user_set_names } from "../../utils";

const SetPreview = ({ name }: { name: string }) => {
  return <>{name}</>;
};

export const Sets = () => {
  // const { authenticated } = React.useContext(AuthContext);
  const [sets, setSets] = React.useState<string[]>([]);
  const { username } = useParams();

  // React.useEffect(() => {
  //   if (authenticated) {
  //     get_user_set_names(authenticated.username).then((val) => {
  //       setSets(val);
  //     });
  //   }
  // }, [authenticated]);

  React.useEffect(() => {
    if (username) {
      get_user_set_names(username).then((val) => {
        setSets(val);
      });
    }
  }, [username]);

  return (
    <div>
      <Link to={"/new-set"}>Create New Set</Link>
      <div className="sets-container">
        {sets.map((val) => (
          <SetPreview name={val} />
        ))}
      </div>
    </div>
  );
};
