import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { get_user_set_names, SetNameMap } from "../../utils";
import "./Sets.css";

const SetPreview = ({ name, setid }: { name: string; setid: string }) => {
  return (
    <Link className="sets-preview-container" to={`/sets/${setid}`}>
      {name}
    </Link>
  );
};

export const Sets = () => {
  const [sets, setSets] = React.useState<SetNameMap[]>([]);
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
    <div className="sets-top-level">
      <div className="sets-top-bar">
        <div className="sets-top-bar-25" />
        <h1 id="sets-top-bar-title">{username}'s Sets</h1>
        <Link className="sets-top-bar-25" to={"/new-set"}>
          Create New Set
        </Link>
      </div>
      <div className="sets-container">
        {sets.map((val, ind) => (
          <SetPreview
            key={`set-preview-key-${ind}`}
            name={val.name}
            setid={val.setid}
          />
        ))}
      </div>
    </div>
  );
};
