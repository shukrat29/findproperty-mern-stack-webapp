import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Send a POST request to the signup API with form data
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Parse the JSON response returned by the backend
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);

        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div>
        <h1 className="font-semibold text-3xl mt-10">SignUp</h1>
      </div>
      <div className="">
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col   space-y-4 w-80 "
        >
          <input
            type="text"
            placeholder="Enter username"
            id="username"
            className="border border-gray-200 rounded-sm p-2"
            onChange={handleOnChange}
          />
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>

        <div>
          <p className="text-center pt-3">
            Have an account?{" "}
            <Link to="/signin">
              <span className="text-blue-700 cursor-pointer">
                Click here to Login
              </span>
            </Link>
          </p>
        </div>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
