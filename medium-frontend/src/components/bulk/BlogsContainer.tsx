import { useEffect, useState } from "react";
import SingleBlogCard from "./SingleBlog";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

type BlogsType = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
};

export default function BlogsContainer() {
  const [blogs, setBlogs] = useState<BlogsType[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.data) {
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col items-center">
      {blogs.map((blog, id) => {
        return (
          <div className="py-10" key={id}>
            <SingleBlogCard
              author={"john doe"}
              publishedAt={"blog.publishedAt"}
              content={blog.content}
              title={blog.title}
            />
          </div>
        );
      })}
    </div>
  );
}
