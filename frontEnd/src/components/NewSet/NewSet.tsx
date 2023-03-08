import React from "react";
import { LoadingModal } from "../LoadingModal/LoadingModal";
import "./NewSet.css";

export interface MiniCard {
  phrase: string;
  definition: string;
}

export const NewSet = () => {
  const [newSetName, setNewSetName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [cards, setCards] = React.useState<MiniCard[]>([]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    // Call to API
    setTimeout(() => setLoading(false), 500);
  };

  const handleChangePhrase = (ind: number, newVal: string) => {
    const cardsCopy = [...cards];
    cardsCopy[ind].phrase = newVal;
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

  return loading ? (
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
                  value={val.phrase}
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
              setCards([...cards, { phrase: "", definition: "" }]);
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
  );
};
