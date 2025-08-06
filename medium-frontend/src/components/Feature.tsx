const FEATURES = [
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
];

export default function Feature({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

export function FeatureSection() {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-4">Powerful Features</h2>
      <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
        Everything you need to write, share, and grow your ideas. No clutter.
        Just power.
      </p>

      <div className="grid gap-8 md:grid-cols-3">
        {FEATURES.map((feature, idx) => {
          return (
            <Feature
              key={idx}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            />
          );
        })}
      </div>
    </section>
  );
}
