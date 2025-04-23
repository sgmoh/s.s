import React from 'react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="/love-bot-logo.jpg" 
            alt="Sage and Salman Logo" 
            className="w-10 h-10 rounded-full border-2 border-pink-200" 
          />
          <h1 className="text-2xl font-['Poppins'] font-semibold text-gray-800">Sage and Salman</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              <span className="material-icons">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF6B6B] rounded-full"></span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#7289DA] flex items-center justify-center text-white">
              <span className="material-icons text-sm">person</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
