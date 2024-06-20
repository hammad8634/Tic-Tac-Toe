import React, { useState } from "react";
import MainComponent from "./testComponent1";

const GameBoard = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const getDescription = (move) => {
    let desc;
    if (move > 0) {
      desc = "Jump to move " + move;
    } else {
      desc = "Restart the game.";
    }
    return desc;
  };

  return (
    <div className="game">
      <div className="game-board">
        <MainComponent
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info d-inline-flex">
        <ol>
          {history.map((squares, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)} className="game-board-status-button">
                {getDescription(move)}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default GameBoard;
