"use client";
import React, { useState, useRef, useEffect } from "react";
import LetterBox from "@/components/LetterBox";
import { fetchColors } from "@/components/API/ColorLetters";
import { fetchValidation } from "@/components/API/ValidateGuess";
import VirtualKeyboard from "@/components/VirtualKeyboard";
import checkWin from "@/components/utils";

// Define the expected structure of the colorsDict
interface ColorsDict {
  [key: string]: string[]; // key is the word, value is an array of colors
}

// Define props for WordsGrid component
interface WordsGridProps {
  word: string; // word is passed as a prop
  setShowWinPopup: (show: boolean) => void; // function to toggle win popup
}

const WordsGrid: React.FC<WordsGridProps> = ({ word, setShowWinPopup }) => {
  const [guesses, setGuesses] = useState<string[][]>(
    Array(6).fill(Array(5).fill(""))
  );
  const [colors, setColors] = useState<string[][]>(
    Array(6).fill(Array(5).fill(""))
  );
  const [currentRow, setCurrentRow] = useState<number>(0);
  const focusRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: 6 }, () => Array(5).fill(null))
  );

  useEffect(() => {
    focusRefs.current[0][0]?.focus();
  }, []);

  const moveFocus = (row: number, col: number) => {
    focusRefs.current[row]?.[col]?.focus();
  };

  const handleLetterChange = async (
    letter: string,
    rowIndex: number,
    colIndex: number
  ) => {
    console.log(
      `Letter changed: ${letter} at position [${rowIndex}, ${colIndex}]`
    );

    const newGuesses = guesses.map((row, rIndex) =>
      row.map((col, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? letter : col
      )
    );
    setGuesses(newGuesses);
    console.log("Updated guesses:", newGuesses);

    if (colIndex === 4) {
      const completedRow = newGuesses[rowIndex].join("");
      console.log(`Row completed: ${completedRow}`);

      try {
        const validationResult = await fetchValidation({ guess: completedRow });
        if (!validationResult) {
          console.log("Validation failed for guess:", completedRow);
          return;
        }
        console.log("Validation successful for guess:", completedRow);

        setCurrentRow(rowIndex + 1);
        focusRefs.current[rowIndex + 1]?.[0]?.focus();

        const colorsDict = await fetchColors({
          guess: completedRow,
          word: word,
        });
        console.log(`checking guess: ${completedRow} against word: ${word}`);
        if (colorsDict && colorsDict[completedRow]) {
          const colorsArray = colorsDict[completedRow];
          const newColors = colors.map((row, rIndex) =>
            rIndex === rowIndex ? colorsArray : row
          );
          setColors(newColors);

          if (checkWin(rowIndex, newColors)) {
            setShowWinPopup(true);
            return;
          }

          setCurrentRow(rowIndex + 1);
          moveFocus(rowIndex + 1, 0);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      moveFocus(rowIndex, colIndex + 1);
    }
  };

  const handleBackspace = (rowIndex: number, colIndex: number) => {
    if (rowIndex < 0 || colIndex < 0) return;

    const newGuesses = [...guesses];
    if (newGuesses[rowIndex][colIndex] === "") {
      if (colIndex > 0) {
        newGuesses[rowIndex][colIndex - 1] = "";
        setGuesses(newGuesses);
        moveFocus(rowIndex, colIndex - 1);
      }
    } else {
      newGuesses[rowIndex][colIndex] = "";
      setGuesses(newGuesses);
      moveFocus(rowIndex, colIndex);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col gap-2">
        {guesses.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2">
            {row.map((letter, colIndex) => (
              <LetterBox
                key={colIndex}
                maxLength={1}
                onLetterChange={(letter) =>
                  handleLetterChange(letter, rowIndex, colIndex)
                }
                onBackspace={() => handleBackspace(rowIndex, colIndex)}
                inputRef={(el) => (focusRefs.current[rowIndex][colIndex] = el)}
                backgroundColor={colors[rowIndex][colIndex]}
                letter={letter}
              />
            ))}
          </div>
        ))}
      </div>
      <VirtualKeyboard
        onKeyPress={(key: string) => {
          if (key === "⌫") {
            const colIndex = guesses[currentRow].findIndex(
              (letter) => letter === ""
            );
            handleBackspace(currentRow, colIndex - 1 >= 0 ? colIndex - 1 : 4);
          } else {
            const colIndex = guesses[currentRow].findIndex(
              (letter) => letter === ""
            );
            if (colIndex !== -1) handleLetterChange(key, currentRow, colIndex);
          }
        }}
      />
    </div>
  );
};

export default WordsGrid;
