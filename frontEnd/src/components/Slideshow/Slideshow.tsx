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

  const prevItem = () => {
    setCurrentIndex((currentIndex - 1 + data.length) % data.length);
  };

  const nextItem = () => {
    setCurrentIndex((currentIndex + 1) % data.length);
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="slideshow-container">
          {/* {viewingSlice.map((val, ind) => {
        const conf = retrieve_config(ind);
        return (
          <div
            key={`slideshow-item-ind-${ind}`}
            className={conf.className}
            onClick={miniShiftLeft}
            // onTransitionEnd={transEnd}
          >
            <Component data={val} position={conf.pos} />
          </div>
        );
      })} */}

          <div className="slideshow-item-left" onClick={prevItem}>
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
          </div>
        </div>
      ) : (
        <>EMPTY SLIDESHOW</>
      )}
    </>
  );
}
