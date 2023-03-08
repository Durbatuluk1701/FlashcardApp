import React from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../contexts";
import { CardData, Flashcard } from "../Flashcard/Flashcard";
import { Slideshow } from "../Slideshow/Slideshow";
import "./Sets.css";

// const SETS: CardData[] = ;

export const Sets = () => {
  const { authenticated } = React.useContext(AuthContext);

  const [cards, setCards] = React.useState<CardData[]>([
    {
      front: "front1",
      back: "back1",
      flipped: false,
      setFlipped: (b: boolean) => {
        const cardsCopy = [...cards];
        cardsCopy[0].flipped = b;
        setCards(cardsCopy);
      },
    },
    {
      front: "front2",
      back: "back2",
      flipped: false,
      setFlipped: (b: boolean) => {
        const cardsCopy = [...cards];
        cardsCopy[1].flipped = b;
        setCards(cardsCopy);
      },
    },
    {
      front: "front3",
      back: "back3",
      flipped: false,
      setFlipped: (b: boolean) => {
        const cardsCopy = [...cards];
        cardsCopy[2].flipped = b;
        setCards(cardsCopy);
      },
    },
    {
      front: "front4",
      back: "back4",
      flipped: false,
      setFlipped: (b: boolean) => {
        const cardsCopy = [...cards];
        cardsCopy[3].flipped = b;
        setCards(cardsCopy);
      },
    },
  ]);

  return authenticated ? (
    <div className="sets-container">
      <div className="sets-slideshow">
        <Slideshow Component={Flashcard} data={cards} />
      </div>
    </div>
  ) : (
    <Navigate to={"/login?redirect=" + encodeURIComponent("/sets")} />
  );
};
