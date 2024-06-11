"use client";

import { cn } from "../lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { Compass, HomeIcon, Mic } from "lucide-react";
// import { useAudio } from '@/providers/AudioProvider';

const PodcastSidebar = () => {
  const sidebarLinks = [
    {
      href: "/podcast",
      label: "Home",
      icon: HomeIcon,
    },
    {
      href: "/discover",
      label: "Discover",
      icon: Compass,
    },
    {
      href: "/create-podcast",
      label: "Create Podcast",
      icon: Mic,
    },
  ];
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="space-y-4 py-4 flex flex-col h-[100vh] bg-[#111827]">
      <div className="px-4 py-2 flex-1 mb-2">
        <div className="space-y-1">
          {sidebarLinks.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ${
                route.href === pathname
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              }`}
            >
              <div className="flex items-center flex-1">
                <route.icon className={`h-5 w-5 mr-3`} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastSidebar;
