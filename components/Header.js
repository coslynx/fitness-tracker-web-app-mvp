"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">Fitness Tracker</h1>
        </Link>
        <ul className="flex space-x-4">
          {session && (
            <>
              <li>
                <Link href="/goals">Goals</Link>
              </li>
              <li>
                <Link href="/progress">Progress</Link>
              </li>
              <li>
                <Link href="/community">Community</Link>
              </li>
              <li>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!session && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;