import { useState, type ChangeEvent } from "react";
import PublishTopbar, { BlogTitle } from "../components/publish/PublishTopbar";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export default function Publish() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  async function publishBlog() {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog/publish`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      alert("blog created successfully");
      navigate("/blogs");
    } else if (response.status === 401) {
      alert("write it again");
    } else {
      alert("write again the blog");
    }
  }

  return (
    <div>
      <PublishTopbar onClick={publishBlog} />

      {/* this div contains the content area, like title and content of the blog */}
      <div className="flex justify-center mt-7">
        <div className="w-2/3 flex flex-col gap-5">
          <BlogTitle
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <BlogContent
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function BlogContent({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      onChange={onChange}
      name=""
      id=""
      placeholder="Content..."
      className="w-full h-[400px] border border-gray-300 p-5 text-2xl"
    ></textarea>
  );
}
