"use client";

import { CubeIcon, HomeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import {
  Code,
  Image as ImageIcon,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { Warehouse } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import FreeCounter from "./FreeCounter";

const routes = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Dashboard",
    icon: CubeIcon,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Room Generation",
    icon: Warehouse,
    href: "/dream",
    color: "text-sky-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-sky-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-sky-500",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-sky-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-sky-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-sky-500",
  },
];

interface SidebarProps {
  apiLimitCount: number;
}

const Sidebar = ({ apiLimitCount }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827]">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center justify-center pl-3 mb-14">
          <div className="relative mr-4">
            <Image alt="Logo" src="/genius.svg" width={200} height={300} />
          </div>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
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
                <route.icon className={`h-5 w-5 mr-3 ${route.color}`} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
