'use client';
import React, { useState } from 'react';
import LetterBox from './LetterBox';

const WordsGrid: React.FC = () => {
  const [guesses, setGuesses] = useState<string[][]>(Array(6).fill(Array(5).fill('')));
  const [currentRow, setCurrentRow] = useState<number>(0);

  const handleLetterChange = (letter: string, rowIndex: number, colIndex: number) => {
    const newGuesses = [...guesses];
    newGuesses[rowIndex][colIndex] = letter;
    setGuesses(newGuesses);
  };

  const handleBackspace = () => {
    if (currentRow > 0) {
      setCurrentRow(currentRow - 1);
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
              onBackspace={handleBackspace}
              isFocused={rowIndex === currentRow}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordsGrid;
