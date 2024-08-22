"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/lib/store";
import { fetchUserPosts } from "@/lib/db";
import Post from "./Post";

const Community = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const { addPost } = useStore();

  useEffect(() => {
    const fetchPosts = async () => {
      if (session) {
        const data = await fetchUserPosts(session.user.id);
        setPosts(data);
      }
    };

    fetchPosts();
  }, [session]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Community Feed</h2>
      {posts.length > 0 && (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <p className="text-gray-500">No posts yet. Share your progress!</p>
      )}
    </div>
  );
};

export default Community;