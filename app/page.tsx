"use client";
import { useCurrentUser } from "@/lib/hooks";
import Link from "next/link";

export default function Home() {
  const { data: currentUser } = useCurrentUser();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Logo</h1>
      {currentUser ? (
        <span className="text-xl font-bold mb-4">
          Welcome, {currentUser?.user.name}
        </span>
      ) : (
        <Link href="/login" className="text-xl font-bold mb-4">
          Login
        </Link>
      )}
    </div>
  );
}
