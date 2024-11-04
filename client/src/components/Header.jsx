import React from "react";

import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md p-3">
      <div className="flex p-3 justify-between flex-col space-y-6 px-4 md:flex-row md:space-y-0 ">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">EasyHome</span>
            <span className="text-slate-700">Finder</span>
          </h1>
        </Link>
        {/* left side content search and nav items */}
        <div className="flex items-center justify-center ">
          <div>
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
          </div>
          <div>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
