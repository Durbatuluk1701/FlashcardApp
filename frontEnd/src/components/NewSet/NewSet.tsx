import React from "react";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../../contexts";
import { API_add_set } from "../../utils";
import { LoadingModal } from "../LoadingModal/LoadingModal";
import "./NewSet.css";

export interface MiniCard {
  word: string;
  definition: string;
}

export const NewSet = () => {
  const { authenticated, setAuth } = React.useContext(AuthContext);
  const [newSetName, setNewSetName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [cards, setCards] = React.useState<MiniCard[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    // Call to API
    const newSet = {
      name: newSetName,
      cards: cards.map(({ word, definition }) => {
        return {
          word: word,
          definition: definition,
          // TODO: Add tagging here
          tags: [],
        };
      }),
    };
    if (authenticated) {
      API_add_set(authenticated.username, newSet).then((uuid) => {
        if (uuid) {
          console.log("UUID", uuid);
          const updatedUser = authenticated;
          // Adding set id
          updatedUser.sets.push(uuid);
          setAuth(updatedUser);
          setLoading(false);
          // Redirecting
          navigate(`/sets/${authenticated.username}/${uuid}`);
        } else {
          // TODO: Something went wrong
          console.error("New Set Creation went wrong");
        }
      });
    }
  };

  const handleChangePhrase = (ind: number, newVal: string) => {
    const cardsCopy = [...cards];
    cardsCopy[ind].word = newVal;
    setCards(cardsCopy);
  };

  const handleChangeDefn = (ind: number, newVal: string) => {
    const cardsCopy = [...cards];
    cardsCopy[ind].definition = newVal;
    setCards(cardsCopy);
  };

  const handleDeleteCard = (ind: number) => {
    const cardsCopy = [...cards];
    cardsCopy.splice(ind, 1); // Removes 1 element at ind
    setCards(cardsCopy);
  };

  return authenticated ? (
    loading ? (
      <LoadingModal />
    ) : (
      <div className="new-set-container">
        <form className="new-set-form" onSubmit={handleSubmit}>
          <h1 id="new-set-title">New Set Creation</h1>
          <div className="new-set-group">
            <label id="new-set-name-label" htmlFor="new-set-name">
              Set Name
            </label>
            <input
              type="text"
              id="new-set-name"
              name="new set name"
              value={newSetName}
              onChange={(e) => setNewSetName(e.target.value)}
              required
            />
          </div>
          <>
            {/* This is used to make sure the width stays consistent */}
            <div className="new-set-ghost-group">
              <input type="text" />
              <input type="text" />
              <button>Delete</button>
            </div>
          </>
          {cards.length > 0 ? (
            <div id="new-set-cards-list">
              <h2 id="new-set-cards-title">Cards</h2>
              {cards.map((val, ind) => (
                <div key={`new-set-card-${ind}`} className="new-set-card-group">
                  <input
                    type="text"
                    placeholder="Word/Phrase"
                    id={`new-set-card-${ind}-phrase`}
                    name={`new-set-card-${ind}-phrase`}
                    value={val.word}
                    onChange={(e) => handleChangePhrase(ind, e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Definition"
                    id={`new-set-card-${ind}-defn`}
                    name={`new-set-card-${ind}-defn`}
                    value={val.definition}
                    onChange={(e) => handleChangeDefn(ind, e.target.value)}
                    required
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteCard(ind);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          <div className="new-set-button-group">
            <button
              id="new-set-add-card"
              onClick={(e) => {
                e.preventDefault();
                setCards([...cards, { word: "", definition: "" }]);
                // Auto-focuses new card (hopefully!)
                setTimeout(() => {
                  document
                    .querySelector<HTMLInputElement>(
                      `#new-set-card-${cards.length}-phrase`
                    )
                    ?.focus();
                }, 50);
              }}
            >
              Add Card
            </button>
            <button id="new-set-submit" type="submit">
              Create Set
            </button>
          </div>
        </form>
      </div>
    )
  ) : (
    <Navigate to={"/login?redirect=" + encodeURI(window.location.pathname)} />
  );
};
