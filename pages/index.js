"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkoutLog from '@/components/WorkoutLog';
import GoalCard from '@/components/GoalCard';
import SocialFeed from '@/components/SocialFeed';
import { fetchUserGoals } from '@/lib/db';

const Home = () => {
  const { data: session } = useSession();
  const { goals } = useStore();

  return (
    <>
      <Navigation />
      <main className="container mx-auto p-4">
        <Header />
        <h1 className="text-3xl font-bold mb-4">Welcome to Fitness Tracker</h1>
        {session && (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-4">Workout Log</h2>
            <WorkoutLog />
            <h2 className="text-2xl font-bold mb-4">Community</h2>
            <SocialFeed />
          </>
        )}
        {!session && (
          <p className="text-gray-500">
            Please login to access your personalized fitness journey.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;