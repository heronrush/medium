type BlogCardType = {
  title: string;
  content: string;
  publishedAt: string;
  author: string;
};

export default function SingleBlogCard({
  title,
  content,
  publishedAt,
  author,
}: BlogCardType) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 w-[700px] cursor-pointer">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-3">{content}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>
          By <span className="font-medium text-gray-700">{author}</span>
        </p>
        <p>{new Date(publishedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
