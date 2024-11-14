import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      // Getting user details from google
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      //   giving this data to backend which will store in database  or simply signing in
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogleClick}
        type="button"
        className=" border p-3 rounded-sm w-80 hover:opacity-80"
      >
        <div className="flex items-center justify-center gap-3">
          <img src="./google.png" className="h-6 w-6" />{" "}
          <p>Continue with google</p>
        </div>
      </button>
    </div>
  );
};

export default OAuth;
