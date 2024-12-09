'use client';
import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-green-500">Wordle</span>
        </div>

        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-lg hover:text-green-500">Micah</a>
          <a href="/instructions" className="text-lg hover:text-green-500">is a Loser</a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
            New Game
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
