import React from "react";

import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  // getting current user from redux store
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <header className="bg-slate-200 shadow-md p-3">
      <div className="flex p-3 justify-between flex-col space-y-6 px-4 md:flex-row md:space-y-0 ">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-xl flex flex-wrap">
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
            <ul className="flex gap-3 items-center">
              <Link to="/">
                <li className="hidden sm:inline hover:underline">Home</li>
              </Link>
              <Link to="/about">
                <li className="hidden sm:inline hover:underline">About</li>
              </Link>
              <Link to="/signup">
                {!currentUser && (
                  <li className=" sm:inline hover:underline">Sign Up</li>
                )}
              </Link>
              <Link to="/profile">
                {currentUser ? (
                  <img
                    src={currentUser.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  // <p>Welcome, {currentUser.username.split(" ")[0]}</p>
                  <li className=" sm:inline hover:underline">Sign In</li>
                )}
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
