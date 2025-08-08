import { Link, useNavigate } from "react-router-dom";
import Medium from "../Medium";

export default function BlogTopbar() {
  return (
    <div className="py-7 px-10 flex justify-between">
      <div className="flex gap-60">
        <Medium />

        <Searchbar />
      </div>
      <div className="flex gap-20">
        <WriteButton />
        <LogoutButton />
      </div>
    </div>
  );
}

function LogoutButton() {
  const navigate = useNavigate();

  function deleteToken() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <button
      onClick={() => {
        deleteToken();
      }}
      className="border cursor-pointer font-semibold px-5 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-700 transition"
    >
      Logout
    </button>
  );
}

function WriteButton() {
  return (
    <Link to="/publish">
      <button className="border cursor-pointer font-semibold px-5 py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-700 transition">
        Write a blog
      </button>
    </Link>
  );
}

function Searchbar() {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="border border-gray-600	 rounded-full pl-4 focus:outline-0 focus:inset-ring-1 py-2 align-middle w-[300px]"
        placeholder="Search"
      />

      <SearchButton />
    </div>
  );
}

function SearchButton() {
  return (
    <button className=" rounded-full bg-neutral-900 text-white font-semibold hover:bg-neutral-700 cursor-pointer transition py-1	 px-4 border-2">
      Search
    </button>
  );
}
