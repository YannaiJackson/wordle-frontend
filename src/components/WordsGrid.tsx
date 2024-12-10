'use client';
import React, { useState, useRef, useEffect } from 'react';
import LetterBox from '@/components/LetterBox';
import { fetchColors } from '@/components/API/ColorLetters';
import { fetchValidation } from '@/components/API/ValidateGuess';
import VirtualKeyboard from '@/components/VirtualKeyboard';

// Define the expected structure of the colorsDict
interface ColorsDict {
  [key: string]: string[]; // key is the word, value is an array of colors
}

// Define props for WordsGrid component
interface WordsGridProps {
  word: string; // word is passed as a prop
}

const WordsGrid: React.FC<WordsGridProps> = ({ word }) => {
  const [guesses, setGuesses] = useState<string[][]>(Array(6).fill(Array(5).fill('')));
  const [colors, setColors] = useState<string[][]>(Array(6).fill(Array(5).fill('')));
  const [currentRow, setCurrentRow] = useState<number>(0);
  const focusRefs = useRef<(HTMLInputElement | null)[][]>(Array.from({ length: 6 }, () => Array(5).fill(null)));

  // Focus the first input field when the component mounts
  useEffect(() => {
    focusRefs.current[0][0]?.focus();
    console.log('Component mounted. Focusing on the first input field.');
  }, []);

  const handleLetterChange = async (letter: string, rowIndex: number, colIndex: number) => {
    console.log(`Letter changed: ${letter} at position [${rowIndex}, ${colIndex}]`);

    const newGuesses = guesses.map((row, rIndex) =>
      row.map((col, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? letter : col))
    );
    setGuesses(newGuesses);
    console.log('Updated guesses:', newGuesses);

    if (colIndex === 4) {
      const completedRow = newGuesses[rowIndex].join('');
      console.log(`Row completed: ${completedRow}`);

      try {
        const validationResult = await fetchValidation({ guess: completedRow });
        if (!validationResult) {
          console.log('Validation failed for guess:', completedRow);
          return;
        }
        console.log('Validation successful for guess:', completedRow);

        setCurrentRow(rowIndex + 1);
        focusRefs.current[rowIndex + 1]?.[0]?.focus();

        const colorsDict = await fetchColors({ guess: completedRow, word: word });
        console.log(`checking guess: ${completedRow} against word: ${word}`);
        if (colorsDict && colorsDict[completedRow]) {
          const colorsArray = colorsDict[completedRow];
          const newColors = colors.map((row, rIndex) =>
            rIndex === rowIndex ? colorsArray : row
          );
          setColors(newColors);
          console.log('Updated colors:', newColors);
        }
      } catch (error) {
        console.error('Error during validation or color fetching:', error);
      }
    } else {
      focusRefs.current[rowIndex][colIndex + 1]?.focus();
      console.log(`Focus moved to position [${rowIndex}, ${colIndex + 1}]`);
    }
  };

  const handleBackspace = (rowIndex: number, colIndex: number) => {
    console.log(`Backspace pressed at position [${rowIndex}, ${colIndex}]`);

    const isCurrentCellEmpty = guesses[rowIndex][colIndex] === '';
  
    if (isCurrentCellEmpty && colIndex > 0) {
      const newGuesses = guesses.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map((col, cIndex) => (cIndex === colIndex - 1 ? '' : col))
          : row
      );
  
      setGuesses(newGuesses);
      focusRefs.current[rowIndex][colIndex - 1]?.focus();
      console.log('Moved focus to the previous cell');
    } else {
      const newGuesses = guesses.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map((col, cIndex) => (cIndex === colIndex ? '' : col))
          : row
      );
  
      setGuesses(newGuesses);
      if (colIndex > 0) {
        focusRefs.current[rowIndex][colIndex - 1]?.focus();
      } else {
        focusRefs.current[rowIndex][colIndex]?.focus();
      }
      console.log('Cleared current cell and moved focus accordingly');
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
                onLetterChange={(letter) => handleLetterChange(letter, rowIndex, colIndex)}
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
          console.log(`Key pressed: ${key}`);

          if (key === '⌫') {
            const lastFilledIndex = guesses[currentRow].findIndex(letter => letter === '');
            const colIndex = lastFilledIndex === -1 ? guesses[currentRow].length - 1 : lastFilledIndex - 1;
            handleBackspace(currentRow, colIndex);
          } else {
            const firstEmptyIndex = guesses[currentRow].findIndex(letter => letter === '');
            if (firstEmptyIndex !== -1) {
              handleLetterChange(key, currentRow, firstEmptyIndex);
            }
          }
        }}
      />
    </div>
  );
};

export default WordsGrid;
