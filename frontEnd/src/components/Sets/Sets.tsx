import React from "react";
import { CardData, Flashcard } from "../Flashcard/Flashcard";
import { Slideshow } from "../Slideshow/Slideshow";
import "./Sets.css";

const SETS: CardData[] = [
  {
    front: "front1",
    back: "back1",
    flipped: false,
    setFlipped: (b: boolean) => (SETS[0].flipped = b),
  },
  {
    front: "front2",
    back: "back2",
    flipped: false,
    setFlipped: (b: boolean) => (SETS[1].flipped = b),
  },
  {
    front: "front3",
    back: "back3",
    flipped: false,
    setFlipped: (b: boolean) => (SETS[2].flipped = b),
  },
  {
    front: "front4",
    back: "back4",
    flipped: false,
    setFlipped: (b: boolean) => (SETS[3].flipped = b),
  },
];

export const Sets = () => {
  // const [cards, setCards] = React.useState<CardData[]>([]);

  return (
    <div className="sets-container">
      <div className="sets-slideshow">
        <Slideshow Component={Flashcard} data={SETS} />
      </div>
    </div>
  );
};
