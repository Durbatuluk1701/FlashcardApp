import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { get_user_set_names } from "../../utils";

const SetPreview = ({ name }: { name: string }) => {
  return <>{name}</>;
};

export const Sets = () => {
  const [sets, setSets] = React.useState<string[]>([]);
  const { username } = useParams();

  React.useEffect(() => {
    if (username) {
      get_user_set_names(username).then((val) => {
        switch (val.res) {
          case "Ok":
            setSets(val.val);
            break;
          case "Err":
            console.error(val.val);
        }
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
