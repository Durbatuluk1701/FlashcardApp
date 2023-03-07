import React from "react";
import "./Slideshow.css";

export function Slideshow<T>({
  Component,
  data,
}: {
  Component: React.FunctionComponent<{
    data: T;
    position: string;
    // "left-left" | "left" | "focused" | "right" | "right-right";
  }>;
  data: T[];
}): JSX.Element {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [viewingSlice, setViewingSlice] = React.useState<T[]>([]);

  React.useEffect(() => {
    const gatherSlice = (data: T[], ind: number): T[] => {
      const len = data.length;
      const indices = [
        (ind - 2 + len) % len,
        (ind - 1 + len) % len,
        ind,
        (ind + 1) % len,
        (ind + 2) % len,
      ];
      return indices.map((ind) => data[ind]);
    };

    setViewingSlice(gatherSlice(data, currentIndex));
  }, [data, currentIndex]);

  const add_classes = (
    elemSelect: string,
    classList: string[],
    delay: number
  ) => {
    const elem = document.querySelector(elemSelect);
    if (elem) {
      classList.forEach((className) => {
        elem.classList.add(className);
        setTimeout(() => {
          elem.classList.remove(className);
        }, delay);
      });
    } else {
      console.error("Could not find", elemSelect);
    }
  };

  const prevItem = () => {
    add_classes(".slideshow-item-left", ["shift-left"], 200);
    add_classes(".slideshow-item-active", ["shift-left"], 200);
    add_classes(".slideshow-item-right", ["shift-left"], 200);
    if (currentIndex === 0) {
      setCurrentIndex(data.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextItem = () => {
    add_classes(
      ".slideshow-item-left",
      ["shift-right", "opacity-100", "basis-50"],
      2000
    );
    add_classes(
      ".slideshow-item-active",
      ["shift-right", "opacity-40", "basis-25"],
      2000
    );
    add_classes(
      ".slideshow-item-right",
      ["shift-right", "opacity-0", "basis-0"],
      2000
    );
  };

  const retrieve_config = (ind: number) => {
    switch (ind) {
      case 0:
        return {
          className: "slideshow-item-left-left",
          pos: "left-left",
          onClick: () => {},
          transEnd: () => {},
        };
      case 1:
        return {
          className: "slideshow-item-left",
          pos: "left",
          onClick: prevItem,
          transEnd: () => {
            setCurrentIndex((currentIndex + 1 + data.length) % data.length);
          },
        };
      case 2:
        return {
          className: "slideshow-item-active",
          pos: "focused",
          onClick: () => {},
          transEnd: () => {},
        };
      case 3:
        return {
          className: "slideshow-item-right",
          pos: "right",
          onClick: nextItem,
          transEnd: () => {
            setCurrentIndex((currentIndex + 1 + data.length) % data.length);
          },
        };
      case 4:
        return {
          className: "slideshow-item-right-right",
          pos: "right-right",
          onClick: () => {},
          transEnd: () => {},
        };
      default:
        throw new Error("Invalid index for slideshow item");
    }
  };

  return (
    <div className="slideshow-container">
      {viewingSlice.map((val, ind) => {
        const { className, pos, onClick, transEnd } = retrieve_config(ind);
        return (
          <div
            key={`slideshow-item-ind-${ind}`}
            className={className}
            onClick={onClick}
            onTransitionEnd={transEnd}
          >
            <Component data={val} position={pos} />
          </div>
        );
      })}

      {/* <div className="slideshow-item-left" onClick={prevItem}>
        <Component
          data={data[(currentIndex - 1 + data.length) % data.length]}
          position={"left"}
        />
      </div>
      <div className="slideshow-item-active">
        <Component data={data[currentIndex]} position={"focused"} />
      </div>
      <div className="slideshow-item-right" onClick={nextItem}>
        <Component
          data={data[(currentIndex + 1) % data.length]}
          position={"right"}
        />
      </div> */}
    </div>
  );
}
