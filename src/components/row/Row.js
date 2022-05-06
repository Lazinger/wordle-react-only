/** @format */

import React from "react";
import "./Row.css";

function Row({ guess, currentGuess }) {
  if (guess) {
    return (
      <div className="Row Past">
        {guess.map((letter, i) => {
          return (
            <div key={i} className={letter.color}>
              {letter.key}
            </div>
          );
        })}
      </div>
    );
  }
  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className="Row Current">
        {letters.map((letter, i) => {
          return (
            <div key={i} className="filled">
              {letter}
            </div>
          );
        })}
        {[...Array(5 - letters.length)].map((_, i) => {
          return <div key={i}></div>;
        })}
      </div>
    );
  }

  return (
    <div className="Row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Row;
