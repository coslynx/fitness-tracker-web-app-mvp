"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/lib/store";
import { fetchUserGoals, addGoal, removeGoal } from "@/lib/db";
import GoalCard from "@/components/GoalCard";
import { useRouter } from "next/navigation";

const Goals = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [goals, setGoals] = useState([]);
  const { addGoal: addGoalToStore, removeGoal: removeGoalFromStore } = useStore();

  useEffect(() => {
    const fetchGoals = async () => {
      if (session) {
        const data = await fetchUserGoals(session.user.id);
        setGoals(data);
        addGoalToStore(data);
      }
    };

    fetchGoals();
  }, [session]);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");

    if (!name || !description || !startDate || !endDate) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const newGoal = await addGoal(session.user.id, {
        name,
        description,
        startDate,
        endDate,
      });
      setGoals([...goals, newGoal]);
      addGoalToStore([...goals, newGoal]);
      router.refresh();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await removeGoal(goalId);
      setGoals(goals.filter((goal) => goal.id !== goalId));
      removeGoalFromStore(goalId);
      router.refresh();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Fitness Goals</h2>

      <form onSubmit={handleAddGoal} className="mb-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-gray-700">
            Goal Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="description" className="text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <label htmlFor="startDate" className="text-gray-700">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="endDate" className="text-gray-700">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Goal
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onDelete={handleDeleteGoal} />
        ))}
      </div>
    </div>
  );
};

export default Goals;