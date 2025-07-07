import React from "react";
import { timeAgoWithDate } from "@/helper";
import { markdownStyleObj } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Define the type for your post data
interface PostData {
  title: string;
  createdAt: string; // Depending on what timeAgoWithDate expects
  description: string;
  // Add any other properties your data might have
}

// Define the props for your component
interface SinglePostProps {
  data: PostData;
}

const SinglePost: React.FC<SinglePostProps> = ({ data }) => {
  return (
    <div>
      <div className="px-2 py-4 bg-theme-yellow md:px-4">
        <h1 className="text-3xl font-semibold">{data.title}</h1>
        <small>Posted on : {timeAgoWithDate(data.createdAt)}</small>
      </div>
      <article className="py-2 main-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownStyleObj}
        >
          {data.description}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default SinglePost;
