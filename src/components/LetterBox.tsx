/**
 * This file contains the LetterBox component, which is responsible for rendering an individual letter box in the Wordle game.
 */

'use client';
import React from 'react';

// Define props for LetterBox component
interface LetterBoxProps {
  maxLength: number;
  onLetterChange: (letter: string) => void;
  onBackspace: () => void;
  inputRef?: (ref: HTMLInputElement | null) => void;
  backgroundColor?: string;
  letter: string;  // Accept the letter as a prop
}

const LetterBox: React.FC<LetterBoxProps> = ({
  maxLength,
  onLetterChange,
  onBackspace,
  inputRef,
  backgroundColor,
  letter,  // Destructure the letter prop
}) => {

  // Function to handle key down events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      console.log(`Physical keyboard key pressed: ⌫`);
      onBackspace();
    } else if (e.key.length === 1 && /^[A-Za-z]$/.test(e.key)) {
      const uppercaseLetter = e.key.toUpperCase();
      console.log(`Physical keyboard key pressed: ${uppercaseLetter}`);
      onLetterChange(uppercaseLetter);
    }
  };

  // Render the LetterBox component
  return (
    <div
      className="w-16 h-16 flex justify-center items-center border-2 border-gray-400 rounded-md"
      style={{ backgroundColor: backgroundColor || 'transparent' }}  // Use backgroundColor directly
    >
      <input
        ref={(el) => {
          if (inputRef) inputRef(el);
        }}
        type="text"
        value={letter}  // Control the value based on the parent state
        onChange={() => {}}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        className="w-full h-full text-3xl text-center font-bold uppercase bg-transparent outline-none text-white caret-transparent"  // Ensure text color is white
      />
    </div>
  );
};

export default LetterBox;