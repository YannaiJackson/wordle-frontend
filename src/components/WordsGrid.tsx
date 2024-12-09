'use client';
import React, { useState, useRef, useEffect } from 'react';
import LetterBox from './LetterBox';

const WordsGrid: React.FC = () => {
  const [guesses, setGuesses] = useState<string[][]>(Array(6).fill(Array(5).fill('')));
  const focusRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: 6 }, () => Array(5).fill(null))
  );

  const handleLetterChange = (letter: string, rowIndex: number, colIndex: number) => {
    const newGuesses = guesses.map((row, rIndex) =>
      row.map((col, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? letter : col))
    );
    setGuesses(newGuesses);

    // Move focus to the next letterbox
    if (colIndex < 4) {
      focusRefs.current[rowIndex][colIndex + 1]?.focus();
    } else if (rowIndex < 5) {
      // Move to the first box of the next row if the current row ends
      focusRefs.current[rowIndex + 1][0]?.focus();
    }
  };

  const handleBackspace = (rowIndex: number, colIndex: number) => {
    if (colIndex > 0) {
      focusRefs.current[rowIndex][colIndex - 1]?.focus();
    } else if (rowIndex > 0) {
      // Move to the last box of the previous row
      focusRefs.current[rowIndex - 1][4]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      {guesses.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {row.map((_, colIndex) => (
            <LetterBox
              key={colIndex}
              maxLength={1}
              onLetterChange={(letter) => handleLetterChange(letter, rowIndex, colIndex)}
              onBackspace={() => handleBackspace(rowIndex, colIndex)}
              inputRef={(el) => (focusRefs.current[rowIndex][colIndex] = el)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordsGrid;
