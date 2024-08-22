"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useStore } from "@/lib/store";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setSession } = useStore();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res.error) {
        // Handle error appropriately, e.g., display an error message to the user
        console.error("Error signing in:", res.error);
        return;
      }

      setSession(res);
      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-gray-700">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="text-gray-700">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;