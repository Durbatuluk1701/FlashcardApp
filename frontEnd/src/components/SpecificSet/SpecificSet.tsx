import React from "react";
import { Navigate, useParams } from "react-router";
import { AuthContext } from "../../contexts";
import { API_get_set } from "../../utils";
import { CardData, Flashcard } from "../Flashcard/Flashcard";
import { Slideshow } from "../Slideshow/Slideshow";
import "./SpecificSet.css";

export const SpecificSet = () => {
  const { authenticated } = React.useContext(AuthContext);

  const { username, setid } = useParams();

  const [name, setName] = React.useState<string>("EMPTY SET NAME");
  const [cards, setCards] = React.useState<CardData[]>([]);

  React.useEffect(() => {
    if (setid) {
      API_get_set(setid).then((setval) => {
        if (setval) {
          setName(setval.name);
          setCards(
            setval.cards.map((card, ind) => {
              return {
                front: card.word,
                back: card.definition,
                flipped: false,
                setFlipped: (b: boolean) => {
                  setCards((prevCards) => {
                    const prevCopy = [...prevCards];
                    prevCopy[ind].flipped = b;
                    return prevCopy;
                  });
                },
              };
            })
          );
        }
      });
    }
  }, [setid]);

  return authenticated ? (
    username && username === authenticated.username ? (
      <>
        <h1 id="specific-set-set-name">{name}</h1>

        <div className="sets-slideshow">
          <Slideshow Component={Flashcard} data={cards} />
        </div>
      </>
    ) : (
      <>
        {
          // TODO: This is not the best approach
        }
        THIS IS NOT YOUR SET
      </>
    )
  ) : (
    <Navigate
      to={"/login?redirect=" + encodeURIComponent(window.location.pathname)}
    />
  );
};
