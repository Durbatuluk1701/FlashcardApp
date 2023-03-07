import React from "react";
import { CardData, Flashcard } from "../Flashcard/Flashcard";
import { Slideshow } from "../Slideshow/Slideshow";
import "./Sets.css";

// const SETS: CardData[] = ;

export const Sets = () => {
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

  return (
    <div className="sets-container">
      <div className="sets-slideshow">
        <Slideshow Component={Flashcard} data={cards} />
      </div>
    </div>
  );
};
