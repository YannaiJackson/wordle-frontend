export default function checkWin(rowIndex: number, colorGrid: string[][]): boolean {
    const letterColors = colorGrid[rowIndex];
    
    // Check if all colors in the row are 'green'
    if (letterColors.every(color => color === 'green')) {
        return true;
    }
    
    return false;
}
