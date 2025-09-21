"use client";
import { supabase } from "../sybase/base";
import SWR from "swr";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Blog() {
  type Post = {
    id: number;
    title: string;
    content: string;
    tags: string;
    // add other fields if needed
  };

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const fetchPosts = async () => {
    const { data: article, error } = await supabase
      .from("article")
      .select("*")
      .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);
    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(article || []);
      localStorage.setItem("posts", JSON.stringify(article || []));
    }
  };

  const pageChange = (nextPage: boolean) => {
    // Fetch posts for the new page if necessary
    if (nextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-5xl">
      <h1 className="text-4xl font-bold text-center">Blog Posts</h1>
      <button className="mt-2 text-blue-500 hover:underline">
        <Link href="/blog/edit">Create New Post</Link>
      </button>
      {/* Blog posts will be rendered here */}
      {posts.map((post) => (
        <div key={post.id} className="border-b border-gray-300 my-8 pb-4">
          <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-700 text-ellipsis">{post.content}</p>
          {post.tags && post.tags.split(",").map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              #{tag}
            </span>
          ))}
          <br />
          <Link
            href={{
              pathname: "/blog/details",
              query: { id: post.id },
            }}
            className="mt-2 text-blue-500 hover:underline"
          >
            Read more
          </Link>
          <Link
            href={{
              pathname: "/blog/edit",
              query: { id: post.id },
            }}
            className="mt-2 ms-4 text-green-500 hover:underline"
          >
            Edit
          </Link>
          <button className="mt-2 ms-4 text-red-500 hover:underline">
            Delete
          </button>
        </div>
      ))}
      {/* Pagination controls */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => pageChange(false)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => pageChange(true)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
