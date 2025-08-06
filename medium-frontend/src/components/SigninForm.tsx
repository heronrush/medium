import { Link, useNavigate } from "react-router-dom";
import LabelInput from "./LabelInput";
import { useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../../config";
import Medium from "./Medium";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // collects all the data from the form inputs and sends them to the backend for signup
  async function sendLoginRequest() {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
      email: email,
      password: password,
    });

    if (response.data) {
      localStorage.setItem("token", response.data.token);
      navigate("/blogs");
    } else {
      alert("unsuccessful");
      return;
    }
  }

  return (
    <div>
      <Medium />
      <div className=" h-screen flex flex-col justify-center  items-center">
        <h1 className="text-4xl font-bold">Access your account</h1>

        <p className="text-gray-500 mt-3">
          Don't have an account?{" "}
          <span className="underline">
            <Link to={"/signup"}>Signup</Link>
          </span>
        </p>

        <div className="mt-10 mr-6 w-[370px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendLoginRequest();
            }}
          >
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
              type="submit"
              className="mt-5 w-full text-2xl cursor-pointer py-2 hover:bg-neutral-700 rounded-md text-white bg-neutral-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
