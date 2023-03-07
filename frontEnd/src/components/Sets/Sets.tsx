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
        const microView = cards.filter((_, ind) => ind !== 0);
        setCards([{ ...cards[0], flipped: b }, ...microView]);
      },
    },
    {
      front: "front2",
      back: "back2",
      flipped: false,
      setFlipped: (b: boolean) => {
        const microView = cards.filter((_, ind) => ind !== 1);
        setCards([{ ...cards[1], flipped: b }, ...microView]);
      },
    },
    {
      front: "front3",
      back: "back3",
      flipped: false,
      setFlipped: (b: boolean) => {
        const microView = cards.filter((_, ind) => ind !== 2);
        setCards([{ ...cards[2], flipped: b }, ...microView]);
      },
    },
    {
      front: "front4",
      back: "back4",
      flipped: false,
      setFlipped: (b: boolean) => {
        const microView = cards.filter((_, ind) => ind !== 3);
        setCards([{ ...cards[3], flipped: b }, ...microView]);
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
