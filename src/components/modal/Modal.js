/** @format */

import React from "react";
import "./Modal.css";

function Modal({ isCorrect, solution, turn }) {
  return (
    <div className="Modal">
      {isCorrect && (
        <div>
          <h1>You Win !</h1>
          <p className="Solution">{solution}</p>
          <p>You found the solution in {turn} guesses !</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You Lost</h1>
          <p className="Solution">{solution}</p>
          <p>Better luck next time</p>
        </div>
      )}
    </div>
  );
}

export default Modal;
