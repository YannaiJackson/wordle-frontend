/**
 * This file contains the WordsGrid component, which is responsible for rendering the grid of letter boxes and handling user input.
 * It also includes the logic for validating guesses, fetching color data, and checking for a win condition.
 */

"use client";
import React, { useState, useRef, useEffect } from "react";
import LetterBox from "@/components/LetterBox";
import { fetchColors } from "@/components/API/ColorLetters";
import { fetchValidation } from "@/components/API/ValidateGuess";
import VirtualKeyboard from "@/components/VirtualKeyboard";
import checkWin from "@/components/utils";

// Define props for WordsGrid component
interface WordsGridProps {
  word: string; // word is passed as a prop
  onWin: () => void;
  onLose: () => void;
}

const WordsGrid: React.FC<WordsGridProps> = ({ word, onWin, onLose }) => {
  // State variables
  const [guesses, setGuesses] = useState<string[][]>(Array(6).fill(Array(5).fill("")));
  const [colors, setColors] = useState<string[][]>(Array(6).fill(Array(5).fill("")));
  const [currentRow, setCurrentRow] = useState<number>(0);
  const focusRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: 6 }, () => Array(5).fill(null))
  );

  // Effect hook to focus on the first letter box when the component mounts
  useEffect(() => {
    focusRefs.current[0][0]?.focus();
  }, []);

  // Function to move focus to a specific letter box
  const moveFocus = (row: number, col: number) => {
    focusRefs.current[row]?.[col]?.focus();
  };

  // Function to handle letter changes in the letter boxes
  const handleLetterChange = async (
    letter: string,
    rowIndex: number,
    colIndex: number
  ) => {
    const newGuesses = guesses.map((row, rIndex) =>
      row.map((col, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? letter : col
      )
    );
    setGuesses(newGuesses);

    if (colIndex === 4) {
      const completedRow = newGuesses[rowIndex].join("");
      try {
        const validationResult = await fetchValidation({ guess: completedRow });
        if (!validationResult) return;

        const colorsDict = await fetchColors({ guess: completedRow, word });
        if (colorsDict && colorsDict[completedRow]) {
          const colorsArray = colorsDict[completedRow];
          const newColors = colors.map((row, rIndex) =>
            rIndex === rowIndex ? colorsArray : row
          );
          setColors(newColors);

          if (checkWin(rowIndex, newColors)) {
            onWin();
            return;
          }

          if (rowIndex === 5 && !checkWin(rowIndex, newColors)) {
            onLose();
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

  // Function to handle backspace key press in the letter boxes
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

  // Render the WordsGrid component
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
