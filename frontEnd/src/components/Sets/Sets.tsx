import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { get_user_set_names, SetNameMap } from "../../utils";
import "./Sets.css";

const SetPreview = ({
  username,
  name,
  setid,
}: {
  username: string;
  name: string;
  setid: string;
}) => {
  return (
    <Link className="sets-preview-container" to={`/sets/${username}/${setid}`}>
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
    <>
      {username ? (
        <div className="sets-top-level">
          <div className="sets-top-bar">
            <div className="sets-top-bar-25" />
            <h1 id="sets-top-bar-title">{username}'s Sets</h1>
            <div className="sets-top-bar-25">
              <Link
                id="create-new-set-button"
                className="sets-top-bar-25"
                to={"/new-set"}
              >
                Create New Set
              </Link>
            </div>
          </div>
          <div className="sets-container">
            {sets.map((val, ind) => (
              <SetPreview
                key={`set-preview-key-${ind}`}
                username={username}
                name={val.name}
                setid={val.setid}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
