import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    console.log("logout button clicked");
  };
  return (
    <div className="flex flex-col max-w-lg mx-auto items-center">
      <h1 className="text-center font-serif font-semibold my-6">My Profile</h1>
      <form action="flex flex-col items-center">
        <div className="flex flex-col items-center space-y-4">
          <img className="rounded-full self-center" src={currentUser.avatar} />
          <input
            type="text"
            placeholder="username"
            id="username"
            className="border p-2 w-80 rounded-lg"
          />
          <input
            type="email"
            id="email"
            placeholder="email"
            className="border p-2 w-80 rounded-lg"
          />
          <input
            type="text"
            placeholder="password"
            id="password"
            className="border p-2 w-80 rounded-lg"
          />
          <button className="bg-slate-600 hover:opacity-80 p-2 w-80 text-white rounded-lg my-5">
            Update
          </button>
        </div>
      </form>
      <div className="flex justify-between mt-5 gap-10 text-red-600 cursor-pointer">
        <span>Delete Account</span>
        <span onClick={handleLogout}>Logout</span>
      </div>
    </div>
  );
};

export default Profile;
