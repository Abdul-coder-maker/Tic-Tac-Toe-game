import React from "react";
import Buttons from "./Buttons";
import theboxes from "./boxes";
import "./App.css"
export default function App() {
  const [boxes, setBoxes] = React.useState(theboxes);
  const [isInRange, setIsInRange] = React.useState(false);
  const [isWinner, setIsWinner] = React.useState(false);
  const [winner, setWinner] = React.useState("");

  function resetGame() {
    setBoxes(theboxes);
    setIsInRange(false);
    setIsWinner(false);
    setWinner("");
  }
  function toggle(id) {
    setBoxes((prevValue) => {
      let newArray = [];
      for (let i = 0; i < prevValue.length; i++) {
        let currentObj = prevValue[i];
        if (currentObj.id === id) {
          newArray.push({ ...currentObj, isClicked: isInRange ? "o" : "x" });
          setIsInRange((prevValue) => !prevValue);
        } else {
          newArray.push(currentObj);
        }
      }
      return newArray;
    });
  }
  React.useEffect(() => {
    function calculateWinner() {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          boxes[a].isClicked &&
          boxes[a].isClicked === boxes[b].isClicked &&
          boxes[a].isClicked === boxes[c].isClicked
        ) {
          //  console.log("Winner", boxes[a].isClicked)
          setIsWinner(true);
          setWinner(boxes[a].isClicked);
        }
      }
    }
    calculateWinner();
  }, [boxes]);
  return (
    <div className="w-screen min-h-screen bg-zinc-800 text-white text-center">
      <div className="max-w-[432px] mx-auto pt-10">
        <h1 className="font-bold text-4xl sm:text-5xl sm:font-extrabold text-lime-100">
          Tic-Tac-Toe Game
        </h1>
        <p className="mt-2">
          Play the classic Tic-Tac-Toe game for free online with your friend.
        </p>
      </div>
      <main className="py-6">
        <div className="grid grid-cols-3 max-w-[384px] mx-auto">
          {boxes.map((box, i) => {
            return (
              <Buttons
                isWinner={isWinner}
                id={box.id}
                key={i}
                toggle={toggle}
                isClicked={box.isClicked}
              />
            );
          })}
        </div>
        {isWinner && (
          <p className="text-4xl font-bold animate__backInDown">
            The Winner is: {winner}
          </p>
        )}
        <button
          className="px-3 py-2 bg-yellow-300 text-black rounded-md mt-4 flex mx-auto items-center text-xl font-medium text-zinc-800 focus:outline-none"
          onClick={resetGame}
        >
          <span>Repeat Game</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler stroke-zinc-800 icon-tabler-rotate-2"
            width="44" 
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 4.55a8 8 0 0 0 -6 14.9m0 -4.45v5h-5" />
            <line x1="18.37" y1="7.16" x2="18.37" y2="7.17" />
            <line x1="13" y1="19.94" x2="13" y2="19.95" />
            <line x1="16.84" y1="18.37" x2="16.84" y2="18.38" />
            <line x1="19.37" y1="15.1" x2="19.37" y2="15.11" />
            <line x1="19.94" y1="11" x2="19.94" y2="11.01" />
          </svg>
        </button>
      </main>
    </div>
  );
}
