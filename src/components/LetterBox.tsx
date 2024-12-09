'use client';
import React, { useState, useRef } from 'react';

interface LetterBoxProps {
  maxLength: number;
  onLetterChange: (letter: string) => void;
  onBackspace: () => void;
  inputRef?: (ref: HTMLInputElement | null) => void;
  backgroundColor?: string;
}

const LetterBox: React.FC<LetterBoxProps> = ({
  maxLength,
  onLetterChange,
  onBackspace,
  inputRef,
  backgroundColor,
}) => {
  const [letter, setLetter] = useState<string>(''); 
  const localRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      onBackspace();
      setLetter('');
    } else if (e.key.length === 1 && /^[A-Za-z]$/.test(e.key)) {
      const uppercaseLetter = e.key.toUpperCase();
      setLetter(uppercaseLetter);
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
          localRef.current = el;
          if (inputRef) inputRef(el);
        }}
        type="text"
        value={letter}
        onChange={() => {}}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        className="w-full h-full text-3xl text-center font-bold uppercase bg-transparent outline-none text-white"
      />
    </div>
  );
};

export default LetterBox;
