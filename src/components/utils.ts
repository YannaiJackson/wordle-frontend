/**
 * This file contains utility functions used throughout the application.
 */

/**
 * Function to check if the player has won the game.
 * @param rowIndex - The index of the current row being checked.
 * @param colorGrid - The grid of colors for each letter in each row.
 * @returns true if all colors in the current row are 'green', indicating a win; otherwise, returns false.
 */
export default function checkWin(rowIndex: number, colorGrid: string[][]): boolean {
    const letterColors = colorGrid[rowIndex];
    
    // Check if all colors in the row are 'green'
    if (letterColors.every(color => color === 'green')) {
        return true;
    }
    
    return false;
}