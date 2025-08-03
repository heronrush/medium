import { Link, useNavigate } from "react-router-dom";
import LabelInput from "./LabelInput";
import { useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../../config";
import Medium from "./Medium";

export default function SignupForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // collects all the data from the form inputs and sends them to the backend for signup
  async function sendSignupRequest() {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/signup`,
      {
        fullname: fullname,
        email: email,
        password: password,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
          "Content-Type": "application/json",
        },
      }
    );

    if (response) {
      alert("success");
      console.log("success");

      navigate("/blogs");
    } else {
      alert("unsuccessful");
      return;
    }
  }

  return (
    <div className=" h-screen flex flex-col justify-center  items-center">
      <Medium />

      <h1 className="text-4xl font-bold">Create an account</h1>

      <p className="text-gray-500 mt-3">
        Already have an account?{" "}
        <span className="underline">
          <Link to={"/signin"}>Login</Link>
        </span>
      </p>

      <div className="mt-10 mr-6 w-[370px]">
        <form action="">
          {/* full name */}
          <LabelInput
            label="Full name"
            type="text"
            placeholder="John Doe"
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
          <LabelInput
            label="Email"
            type="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <LabelInput
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            className="mt-5 w-full text-2xl cursor-pointer py-2 hover:bg-neutral-700 rounded-md text-white bg-neutral-800"
            onClick={sendSignupRequest}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
