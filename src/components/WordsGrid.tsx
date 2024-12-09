'use client';
import React, { useState, useRef } from 'react';
import LetterBox from '@/components/LetterBox';
import { fetchColors } from '@/components/API/ColorLetters';
import { fetchValidation } from '@/components/API/ValidateGuess';


// Define the expected structure of the colorsDict
interface ColorsDict {
  [key: string]: string[]; // key is the word, value is an array of colors
}

const WordsGrid: React.FC = () => {
  const [guesses, setGuesses] = useState<string[][]>(Array(6).fill(Array(5).fill('')));
  const [colors, setColors] = useState<string[][]>(Array(6).fill(Array(5).fill('')));
  const [currentRow, setCurrentRow] = useState<number>(0);
  const focusRefs = useRef<(HTMLInputElement | null)[][]>(Array.from({ length: 6 }, () => Array(5).fill(null)));

  // Making the function async to handle the await call to fetchColors
  const handleLetterChange = async (letter: string, rowIndex: number, colIndex: number) => {
    console.log(`Letter changed: ${letter} at position [${rowIndex}, ${colIndex}]`);

    const newGuesses = guesses.map((row, rIndex) =>
      row.map((col, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? letter : col))
    );
    setGuesses(newGuesses);

    // Move focus to the next letterbox
    if (colIndex < 4) {
      focusRefs.current[rowIndex][colIndex + 1]?.focus();
      console.log(`Focus moved to next letter at position [${rowIndex}, ${colIndex + 1}]`);
    } else {
      // Validate the guess and then fetchColors after completing the row
      const completedRow: string = newGuesses[rowIndex].join('');
      console.log(`Row completed: ${completedRow}`);

      try{
        const validationResult = await fetchValidation({ guess: completedRow });
        if(validationResult) {
            console.log(`Guess is valid`);
        } else {
            console.log(`Guess is invalid`);
            return;  // Return early if the guess is invalid
        }
      } catch (error) {
        console.error("Error validating guess:", error);
      }

      setCurrentRow(rowIndex + 1);
      focusRefs.current[rowIndex + 1]?.[0]?.focus();
      console.log(`Focus moved to next row [${rowIndex + 1}, 0]`);

      const testWord: string = "TRUTH";  // Replace with the actual word to check against
      console.log(`Fetching colors for guess: ${completedRow} with test word: ${testWord}`);

      try {
        const colorsDict = await fetchColors({ guess: completedRow, word: testWord });

        if (colorsDict && colorsDict[completedRow]) {
          const colorsArray = colorsDict[completedRow];  // Access the colors array using the completed guess as the key
          const newColors = colors.map((row, rIndex) =>
            rIndex === rowIndex ? colorsArray : row // Update only the current row's colors
          );

          console.log(`Colors for guess: ${completedRow} are: ${colorsArray}`);
          console.log(`New colors state:`, newColors);
          setColors(newColors);  // Update the colors state with the result
        } else {
          console.log(`No colors found for guess: ${completedRow}`);
        }
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    }
  };

  const handleBackspace = (rowIndex: number, colIndex: number) => {
    console.log(`Backspace pressed at position [${rowIndex}, ${colIndex}]`);

    if (colIndex > 0 && colIndex < 5) {
      focusRefs.current[rowIndex][colIndex - 1]?.focus();
      console.log(`Focus moved to previous letter at position [${rowIndex}, ${colIndex - 1}]`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      {guesses.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {row.map((letter, colIndex) => (
            <LetterBox
              key={colIndex}
              maxLength={1}
              onLetterChange={(letter) => handleLetterChange(letter, rowIndex, colIndex)}
              onBackspace={() => handleBackspace(rowIndex, colIndex)}
              inputRef={(el) => (focusRefs.current[rowIndex][colIndex] = el)}
              backgroundColor={colors[rowIndex][colIndex]}  // Display the color for the letter
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordsGrid;
