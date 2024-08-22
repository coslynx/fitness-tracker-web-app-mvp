"use client";

import React from "react";
import { useStore } from "@/lib/store";

const GoalCard = ({ goal }) => {
  const { removeGoal } = useStore();

  const handleDeleteGoal = () => {
    removeGoal(goal.id);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{goal.name}</h2>
      <p className="text-gray-700 mb-2">{goal.description}</p>
      <p className="text-gray-500">
        {goal.startDate} - {goal.endDate}
      </p>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteGoal}
        >
          Delete Goal
        </button>
      </div>
    </div>
  );
};

export default GoalCard;