"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();

  return (
    <footer className="bg-gray-800 text-white p-4 mt-10">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.
        </p>
        <ul className="flex space-x-4 justify-center">
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
        {session && (
          <p className="mt-2">
            Logged in as{" "}
            <span className="font-bold">{session.user.name}</span>
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;