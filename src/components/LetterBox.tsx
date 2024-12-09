'use client';
import React, { useState, useEffect, useRef } from 'react';

interface LetterBoxProps {
  maxLength: number;
  onLetterChange: (letter: string) => void;
  onBackspace: () => void;
  isFocused: boolean;
}

const LetterBox: React.FC<LetterBoxProps> = ({ maxLength, onLetterChange, onBackspace, isFocused }) => {
  const [letter, setLetter] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle key events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      onBackspace(); // Handle backspace action in parent
      setLetter(''); // Clear the letter in the input box
    } else if (e.key.length === 1 && /^[A-Za-z]$/.test(e.key)) {
      // If the key is a valid letter, set the letter and notify parent
      const uppercasedLetter = e.key.toUpperCase();
      setLetter(uppercasedLetter);
      onLetterChange(uppercasedLetter); // Notify parent component
    }
  };

  // Focus on the input field if `isFocused` is true
  useEffect(() => {
    if (inputRef.current && isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="w-16 h-16 flex justify-center items-center border-2 border-gray-400 rounded-md">
      <input
        ref={inputRef}
        type="text"
        value={letter}
        onChange={(e) => setLetter(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        className="w-full h-full text-3xl text-center font-bold uppercase bg-transparent outline-none text-white"
        disabled={false}
      />
    </div>
  );
};

export default LetterBox;
