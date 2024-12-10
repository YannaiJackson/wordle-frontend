'use client';
import React, { useState, useRef } from 'react';

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
  const localRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      console.log(`Backspace pressed in LetterBox`);
      onBackspace();
    } else if (e.key.length === 1 && /^[A-Za-z]$/.test(e.key)) {
      const uppercaseLetter = e.key.toUpperCase();
      console.log(`Letter pressed: ${uppercaseLetter}`);
      onLetterChange(uppercaseLetter);
    }
  };

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
