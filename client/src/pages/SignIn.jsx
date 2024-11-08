import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      // Send a POST request to the signup API with form data
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Parse the JSON response returned by the backend
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));

        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div>
        <h1 className="font-semibold text-3xl mt-10">Login</h1>
      </div>
      <div className="">
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col   space-y-4 w-80 "
        >
          <input
            type="text"
            placeholder="Enter email"
            id="email"
            className="border border-gray-200 rounded-sm p-2"
            onChange={handleOnChange}
          />
          <input
            type="text"
            placeholder="Enter password"
            id="password"
            className="border border-gray-200 rounded-sm p-2"
            onChange={handleOnChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-sm uppercase hover:opacity-80 disabled:opacity-70"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <OAuth />
        </form>
        
        <div>
          <p className="text-center pt-3">
            Dont have an account?{" "}
            <Link to="/signup">
              <span className="text-blue-700 cursor-pointer">
                Click here to Signup
              </span>
            </Link>
          </p>
        </div>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignIn;
