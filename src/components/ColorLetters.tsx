'use client';
import React from 'react';

interface ColorLettersProps {
  row: string;
  onColorResult: (colors: string[]) => void;
}

const ColorLetters: React.FC<ColorLettersProps> = ({ row, onColorResult }) => {
  React.useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch('http://localhost:8000/en/check-guess', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ row }),
        });

        if (response.ok) {
          const data: { colors: string[] } = await response.json();
          onColorResult(data.colors);
        } else {
          console.error('Failed to fetch colors');
        }
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchColors();
  }, [row, onColorResult]);

  return null; // This component does not render anything visible
};

export default ColorLetters;
