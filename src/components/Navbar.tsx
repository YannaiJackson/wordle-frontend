"use client";
import React, { useState } from "react";
import Image from "next/image";
import globe from "../../public/globe.svg";

const Navbar = () => {
  const [isEnglish, setIsEnglish] = useState(true); // Use boolean for state

  const handleChangeLanguage = () => {
    setIsEnglish(!isEnglish);
    console.log(`Changed language to ${isEnglish ? 'HE' : 'EN'}`); // Log the correct toggled language
  };

  const handleNewGame = () => {
    window.location.reload();
  };

  return (
    <header className="bg-gray-800 text-white shadow-md px-12">
      <div className="px-8 py-4 flex justify-between items-center">
        <div className="text-4xl font-bold">
          <span className="text-green-500">Wordle</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleNewGame} 
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md flex items-center">
            New Game
          </button>
          <button
            // onClick={handleChangeLanguage}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2"
          >
            <span>EN</span>
            {/* <span>{isEnglish ? 'EN' : 'HE'}</span> */}
            <Image src={globe} alt="Globe" width={20} height={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
