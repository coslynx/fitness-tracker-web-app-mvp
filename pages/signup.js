"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createUser } from "@/lib/db";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const { data: session } = useSession();

  if (session) {
    router.push("/");
    return null;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      router.push("/login");
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
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
        <label htmlFor="firstName" className="text-gray-700">
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName" className="text-gray-700">
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.lastName}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;