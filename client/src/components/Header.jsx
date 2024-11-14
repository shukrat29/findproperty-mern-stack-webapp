import React, { useEffect } from "react";

import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  // getting current user from redux store
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-red-500 shadow-md flex p-3 justify-between flex-col space-y-6 px-4 sm:flex-row md:space-y-0">
      {/* website name */}
      <div>
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-xl flex flex-wrap">
            <span className="text-slate-50">EasyHome</span>
            <span className="text-slate-50">Finder</span>
          </h1>
        </Link>
      </div>

      {/* right side content search and nav items */}
      <div className="flex gap-10">
        {/* search section */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-3 rounded-md flex items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="mx-2 bg-gray-300 ">
              <CiSearch className="text-slate-600" />
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center ">
          <ul className="flex gap-3 items-center text-white font-semibold">
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
              {currentUser && currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <li className="sm:inline hover:underline">Sign In</li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
