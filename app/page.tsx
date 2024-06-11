"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import { useUser } from "../hooks/useUser";
import UseAuthModal from "../hooks/UseAuthModal";

export default function HomePage() {
  const { user } = useUser();
  const authModal = UseAuthModal();

  console.log(user, "user--=-=-=-");

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          Generating anything{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">using AI</span>
          </span>{" "}
          for everyone.
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
          Use AI to generate anything you can imagine. 100% free – start
          creating today!
        </h2>
        <Link
          className="bg-blue-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-blue-500 transition"
          href={user ? "/dashboard" : "/"}
          onClick={(e) => {
            if (!user) {
              e.preventDefault();
              authModal.onOpen();
            }
          }}
        >
          Get Started
        </Link>
      </main>
    </div>
  );
}
