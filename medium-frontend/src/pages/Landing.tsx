import { Link } from "react-router-dom";
import Medium from "../components/Medium";
import { FeatureSection } from "../components/Feature";
import { CTA } from "../components/Misc";

export default function Landing() {
  return (
    <div>
      <Topbar />

      <Hero />

      <FeatureSection />

      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <div className="h-[500px] px-54 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold ">"Craft. Publish. Inspire."</h1>

          <p className="text-3xl mt-7 font-semibold italic">
            Stop overthinking. Start expressing. Change the game.
          </p>
        </div>

        <button className="border text-2xl px-5 py-2 rounded-md bg-neutral-800 text-white hover:bg-neutral-600 cursor-pointer">
          Start writing
        </button>
      </div>
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
