import { Link } from "react-router-dom";
import Medium from "../components/Medium";

export default function Landing() {
  return (
    <div>
      <Topbar />

      <Hero />

      <FeatureSection />
    </div>
  );
}

function Hero() {
  return (
    <div className="h-[500px] px-54 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold">"Craft. Publish. Inspire."</h1>

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

function FeatureSection() {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-4">Powerful Features</h2>
      <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
        Everything you need to write, share, and grow your ideas. No clutter.
        Just power.
      </p>

      <div className="grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Minimal Writing Interface",
            desc: "No distractions. Just you and your words.",
            icon: "📝",
          },
          {
            title: "Customizable Profiles",
            desc: "Showcase your bio, avatar, and published articles.",
            icon: "👤",
          },
          {
            title: "Dark Mode",
            desc: "Write comfortably, day or night.",
            icon: "🌙",
          },
          {
            title: "Publishing Tools",
            desc: "Save drafts, schedule posts, and update blogs.",
            icon: "🚀",
          },
          {
            title: "Audience Insights",
            desc: "Real-time analytics on your blogs.",
            icon: "📊",
          },
          {
            title: "Markdown & Rich Text",
            desc: "Write how you want. Technical or poetic.",
            icon: "💡",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
