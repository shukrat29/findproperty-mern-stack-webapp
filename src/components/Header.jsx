import React from "react";

import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md p-3">
      <div className="flex justify-between items-center max-w-full p-3 mx-10">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">EasyHome</span>
            <span className="text-slate-700">Finder</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-md flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent"
          />
          <button className="mx-2 bg-gray-300 ">
            <CiSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-3">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link to="/signin">
            <li className=" sm:inline hover:underline">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
