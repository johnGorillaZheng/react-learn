"use client";
import React, { useEffect } from "react";
import Link from "next/link";

export default function Blog() {

  type Post = {
    id: number;
    title: string;
    content: string;
    // add other fields if needed
  };

  const [post, setPost] = React.useState<Post | null>(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    const storedPosts = localStorage.getItem('posts');
    if (id && storedPosts) {
      const posts: Post[] = JSON.parse(storedPosts);
      const foundPost = posts.find(p => p.id === parseInt(id));
      if (foundPost) {
        setPost(foundPost);
      }
    }
  }, []);

  return (
    <div>
      {post ? (
        <>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700">{post.content}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
              <Link href="/"
          className="mt-2 ms-4 text-red-500 hover:underline"
          type="button"
        >
          Return
        </Link>
    </div>
  );
}