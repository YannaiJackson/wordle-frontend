'use client';
import React, { FC, useState, useEffect } from 'react';

interface VirtualKeyboardProps {
  onKeyPress?: (key: string) => void;
}

const VirtualKeyboard: FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  const [inputValue, setInputValue] = useState("");

  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const handleKeyClick = (key: string) => {
    const updatedValue = inputValue + key;
    setInputValue(updatedValue);
    onKeyPress?.(updatedValue);
  };

  const handlePhysicalKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    const allKeys = keys.flat();
    if (allKeys.includes(key)) {
      handleKeyClick(key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handlePhysicalKeyPress);
    return () => {
      window.removeEventListener("keydown", handlePhysicalKeyPress);
    };
  }, [inputValue]);

  return (
    <div className="">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              className="m-1 px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-white rounded-md hover:bg-gray-300"
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
