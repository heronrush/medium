import { Link } from "react-router-dom";
import blog from "../assets/blog.jpg";

export default function Landing() {
  return (
    <div>
      <Topbar />

      <Hero />
    </div>
  );
}

function Hero() {
  return (
    <div className=" h-160 flex w-screen gap-10">
      {/* left side of hero component */}
      <div className="w-1/2 flex flex-col items-center">
        <div className="mt-24 px-10 flex flex-col justify-center items-center">
          <h1 className="text-7xl font-bold text-center">
            Your freedom of expression starts here
          </h1>

          <button className="border border-gray-200 rounded-sm bg-neutral-800 text-white cursor-pointer hover:bg-neutral-700  mt-20 py-2 text-2xl w-[300px]">
            Write Your First Blog
          </button>
        </div>
      </div>

      {/* this is the right side of the hero component */}
      <div className="w-1/2">
        <img
          src={blog}
          className="h-full rounded-lg object-contain"
          alt="blog"
        />
      </div>
    </div>
  );
}

function Topbar() {
  return (
    <div className="py-4 flex justify-evenly border-b border-gray-100">
      <div className="text-2xl">Medium</div>
      <div className="flex gap-15">
        <button className="cursor-pointer text-[18px] hover:text-gray-400 font-semibold text-neutral-600">
          <Link to={"/signin"}>Login</Link>
        </button>
        <button className="cursor-pointer text-[18px] font-semibold hover:text-gray-400 text-neutral-600">
          <Link to={"/signup"}>Signup</Link>
        </button>
      </div>
    </div>
  );
}
