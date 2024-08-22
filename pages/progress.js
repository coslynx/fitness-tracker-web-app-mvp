"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/lib/store";
import { fetchUserWorkouts } from "@/lib/db";
import Workout from "./Workout";

const Progress = () => {
  const { data: session } = useSession();
  const [workouts, setWorkouts] = useState([]);
  const { addWorkout } = useStore();

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (session) {
        const data = await fetchUserWorkouts(session.user.id);
        setWorkouts(data);
      }
    };

    fetchWorkouts();
  }, [session]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Workout Log</h2>
      {workouts.length > 0 && (
        <ul className="space-y-4">
          {workouts.map((workout) => (
            <li key={workout.id}>
              <Workout workout={workout} />
            </li>
          ))}
        </ul>
      )}
      {workouts.length === 0 && (
        <p className="text-gray-500">No workouts logged yet.</p>
      )}
    </div>
  );
};

export default Progress;