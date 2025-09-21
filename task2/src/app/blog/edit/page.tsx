"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import MDEditor from "@uiw/react-md-editor";
import { supabase } from "@/app/sybase/base";
import { useRouter } from "next/navigation";
import { TagsInput } from "react-tag-input-component";

export default function ArticleEdit() {
  const [value, setValue] = useState("**Hello world!!!**");
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    const storedPosts = localStorage.getItem("posts");
    if (id && storedPosts) {
      const posts = JSON.parse(storedPosts);
      const foundPost = posts.find(
        (p: { id: number }) => p.id === parseInt(id)
      );
      if (foundPost) {
        setTitle(foundPost.title);
        setValue(foundPost.content);
        setSelected(foundPost.tags ? foundPost.tags.split(",") : []);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const id = new URLSearchParams(window.location.search).get("id");

    if (id) {
      supabase
        .from("article")
        .update({ title, content: value, tags: selected.join(",") })
        .eq("id", parseInt(id))
        .then(({ data, error }) => {
          if (error) {
            console.error("Error updating article:", error);
            console.log("Article updated:", data);
            router.push("/");
            // Optionally, redirect or give feedback to the user
            // Optionally, redirect or give feedback to the user
          }
        });
      
    } else {
      supabase
        .from("article")
        .insert({ title, content: value, tags: selected.join(",") })
        .then(({ data, error }) => {
          if (error) {
            console.error("Error creating article:", error);
          } else {
            console.log("Article created:", data);
            router.push("/");
            // Optionally, redirect or give feedback to the user
          }
        });
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Edit Article</h1>
      {/* Article edit form will go here */}
      <div>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <label
        htmlFor="title"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Tags
      </label>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="fruits"
        placeHolder="enter fruits"
      />
      <div>
        <label htmlFor="content">Content:</label>
        <MDEditor value={value} onChange={setValue} />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-2 text-blue-500 hover:underline"
        type="submit"
      >
        Save
      </button>
      <Link
        href="/"
        className="mt-2 ms-4 text-red-500 hover:underline"
        type="button"
      >
        Cancel
      </Link>
    </div>
  );
}
