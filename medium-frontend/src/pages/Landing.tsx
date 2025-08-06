import { Link } from "react-router-dom";
import Medium from "../components/Medium";

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
    <div className=" h-160 bg-red-50">
      <button className="border border-gray-200 rounded-sm bg-neutral-800 text-white cursor-pointer hover:bg-neutral-700  mt-20 py-2 text-2xl w-[300px]">
        Write Your First Blog
      </button>
    </div>
  );
}

function Topbar() {
  return (
    <div className="py-4 flex justify-evenly border-b border-gray-100">
      <div className="text-2xl">
        <Medium />
      </div>
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
