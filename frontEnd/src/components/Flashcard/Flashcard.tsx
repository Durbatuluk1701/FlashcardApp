import React from "react";
import "./Flashcard.css";

export interface CardData {
  front: string;
  back: string;
  flipped: boolean;
  setFlipped: (s: boolean) => void;
}

interface FlashcardProps {
  data: CardData;
  position: string;
  // "left-left" | "left" | "focused" | "right" | "right-right";
}

export const Flashcard: React.FunctionComponent<FlashcardProps> = ({
  data: { front, back, flipped, setFlipped },
  position,
}: FlashcardProps) => {
  // const front = props.data.front;
  // const back = props.data.back;
  // const focused = props.position;
  const [posClass, setPosClass] = React.useState("");

  const toggleFlipped = () => {
    // TODO: Currently this is not working as it is not a react state!
    setFlipped(!flipped);
  };

  React.useEffect(() => {
    switch (position) {
      case "left":
        setPosClass(" flash-left");
        break;
      case "right":
        setPosClass(" flash-right");
        break;
      case "focused":
        setPosClass(" flash-focused");
        break;
    }
  }, [position]);

  return (
    <>
      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={
          position === "focused"
            ? toggleFlipped
            : (e) => {
                e.preventDefault();
              }
        }
      >
        <div className={"flashcard-front" + posClass}>{front}</div>
        <div className={"flashcard-back" + posClass}>{back}</div>
      </div>
    </>
  );
};
