/** @format */

import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  // Tranforme un choix en un tableau d'objet de lettre
  // Ex: [{key: "a", color: "yellow"}]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    // Trouver les bonnes lettres en vert

    formattedGuess.forEach((letter, i) => {
      if (solutionArray[i] === letter.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // Trouver les lettres existantes mais mal placés en jaune

    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });
    // console.log(formattedGuess);
    return formattedGuess;
  };

  // Ajouter une nouvelle ligne de choix de lettre
  // Mettre a jour le statut isCorrect si le choix est juste
  // Ajouter un nouveau tour
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      // console.log("prevGuesses", prevGuesses);
      // console.log("newGuesses", newGuesses);

      return newGuesses;
    });
    setHistory((prevHistory) => {
      // console.log("prevHistory", prevHistory);
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      // console.log("turn", turn);
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((letter) => {
        const currentColor = prevUsedKeys[letter.key];

        if (letter.color === "green") {
          prevUsedKeys[letter.key] = "green";
          return;
        }
        if (letter.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[letter.key] = "yellow";
          return;
        }
        if (letter.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[letter.key] = "grey";
          return;
        }
      });

      return prevUsedKeys;
    });

    setCurrentGuess("");
  };

  // Cette fonction va servir à vérifier plusieurs parametres lors du click sur une touche du clavier
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      // Seulement si le nombre de tour est inférieur à 5
      if (turn > 5) {
        console.log("You used all your guesses");
        return;
      }
      // Ne doit pas accepter deux fois le même mot
      if (history.includes(currentGuess)) {
        console.log("You already tried that word");
        return;
      }
      // On verifie que le mot fait bien 5 lettres
      if (currentGuess.length !== 5) {
        console.log("Word must be 5 chars long");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
