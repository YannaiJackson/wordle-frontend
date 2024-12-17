/**
 * This file contains the WinPopup component, which is displayed when the player wins the game.
 */

import React from 'react';

// Define the props for the WinPopup component
interface WinPopupProps {
  onRestart: () => void; // Callback to restart the game
}

/**
 * The WinPopup component, which is displayed when the player wins the game.
 * @param onRestart - A callback function to restart the game.
 */
const WinPopup: React.FC<WinPopupProps> = ({ onRestart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
        <p className="text-lg mb-6">You guessed the word correctly!</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinPopup;