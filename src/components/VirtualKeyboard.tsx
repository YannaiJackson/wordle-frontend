/**
 * This file contains the VirtualKeyboard component, which is responsible for rendering a virtual keyboard with letter keys.
 * It also handles key press events and triggers the onKeyPress prop with the key pressed.
 */

'use client';
import React, { FC } from 'react';

// Define props for VirtualKeyboard component
interface VirtualKeyboardProps {
  onKeyPress?: (key: string) => void; // Function to handle key press events
}

const VirtualKeyboard: FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "⌫"],
  ];

  // Function to handle key click events
  const handleKeyClick = (key: string) => {
    console.log(`Virtual keyboard key pressed: ${key}`);
    onKeyPress?.(key); // Trigger the onKeyPress prop with the key pressed
  };

  // Render the VirtualKeyboard component
  return (
    <div className="py-0.03">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              className={`m-1 px-5 py-3 text-sm font-medium text-white bg-gray-800 border border-white rounded-md hover:bg-gray-300 hover:text-black 
                ${key === "⌫" ? "bg-red-700 hover:bg-red-400" : ""}`}
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