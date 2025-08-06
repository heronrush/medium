export function CTA() {
  return (
    <section className="bg-neutral-900 text-white py-20 px-6 md:px-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Your story deserves an audience.
      </h2>
      <p className="text-gray-300 mb-10 text-lg md:text-xl">
        Join a growing community of writers, thinkers, and creators. Start
        writing your first blog today.
      </p>
      <div className="flex justify-center">
        <a
          href="/signup"
          className="bg-white text-black font-semibold text-lg px-8 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Start Writing
        </a>
      </div>
    </section>
  );
}
