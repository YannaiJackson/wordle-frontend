/**
 * This file contains the LosePopup component, which is displayed when the player loses the game.
 */

import React from 'react';

// Define the props for the LosePopup component
interface LosePopupProps {
  onRestart: () => void; // Callback to restart the game
  correctWord: string; // The correct word to display
}

/**
 * The LosePopup component, which is displayed when the player loses the game.
 * @param onRestart - A callback function to restart the game.
 * @param correctWord - The correct word that the player failed to guess.
 */
const LosePopup: React.FC<LosePopupProps> = ({ onRestart, correctWord }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">😢 Better Luck Next Time! 😢</h2>
        <p className="text-lg mb-6">The correct word was: <span className="font-mono text-red-500">{correctWord}</span></p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default LosePopup;
