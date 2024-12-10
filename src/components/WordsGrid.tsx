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

const WordsGrid: React.FC = () => {
  const [guesses, setGuesses] = useState<string[][]>(Array(6).fill(Array(5).fill('')));
  const [colors, setColors] = useState<string[][]>(Array(6).fill(Array(5).fill('')));
  const [currentRow, setCurrentRow] = useState<number>(0);
  const focusRefs = useRef<(HTMLInputElement | null)[][]>(Array.from({ length: 6 }, () => Array(5).fill(null)));

  // Focus the first input field when the component mounts
  useEffect(() => {
    focusRefs.current[0][0]?.focus();
  }, []);

  const handleLetterChange = async (letter: string, rowIndex: number, colIndex: number) => {
    console.log(`Letter changed: ${letter} at position [${rowIndex}, ${colIndex}]`);

    const newGuesses = guesses.map((row, rIndex) =>
      row.map((col, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? letter : col))
    );
    setGuesses(newGuesses);

    if (colIndex === 4) {
      const completedRow = newGuesses[rowIndex].join('');
      try {
        const validationResult = await fetchValidation({ guess: completedRow });
        if (!validationResult) return;

        setCurrentRow(rowIndex + 1);
        focusRefs.current[rowIndex + 1]?.[0]?.focus();

        const testWord = 'TRUTH';
        const colorsDict = await fetchColors({ guess: completedRow, word: testWord });
        if (colorsDict && colorsDict[completedRow]) {
          const colorsArray = colorsDict[completedRow];
          const newColors = colors.map((row, rIndex) =>
            rIndex === rowIndex ? colorsArray : row
          );
          setColors(newColors);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      focusRefs.current[rowIndex][colIndex + 1]?.focus();
    }
  };

  const handleBackspace = (rowIndex: number, colIndex: number) => {
    const isCurrentCellEmpty = guesses[rowIndex][colIndex] === '';
  
    if (isCurrentCellEmpty && colIndex > 0) {
      // If the current cell is empty and not the first column, delete the previous cell
      const newGuesses = guesses.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map((col, cIndex) => (cIndex === colIndex - 1 ? '' : col))
          : row
      );
  
      setGuesses(newGuesses);
      focusRefs.current[rowIndex][colIndex - 1]?.focus();
    } else {
      // Otherwise, clear the current cell and keep focus or move to the previous cell
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
        onKeyPress={(key: string) =>
          handleLetterChange(key, currentRow, guesses[currentRow].indexOf(''))
        }
      />
    </div>
  );
};

export default WordsGrid;
