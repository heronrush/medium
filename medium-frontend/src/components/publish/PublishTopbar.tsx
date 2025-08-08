import { Link } from "react-router-dom";
import Medium from "../Medium";
import type { ChangeEvent, MouseEventHandler } from "react";

export default function PublishTopbar({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="py-5 flex justify-center border-b border-gray-300">
      <div className="flex w-2/5 justify-between">
        <Medium />
        <PublishButton onClick={onClick} />
      </div>
    </div>
  );
}

function PublishButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Link to="/publish">
      <button
        onClick={onClick}
        className="mr-10 border cursor-pointer font-semibold px-5 py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-700 transition"
      >
        Publish
      </button>
    </Link>
  );
}

export function BlogTitle({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className=" border focus:outline-0 rounded-md flex justify-center">
      <input
        type="text"
        placeholder="Title"
        className="h-20 pl-3 text-4xl w-full"
        onChange={onChange}
      />
    </div>
  );
}
