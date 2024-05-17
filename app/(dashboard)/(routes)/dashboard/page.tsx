"use client";

import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  Video,
  Warehouse,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ResizablePanel from "../../../../components/ResizablePanel";
import { AnimatePresence, motion } from "framer-motion";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Room Generation",
    icon: Warehouse,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/dream",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: Video,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/video",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/code",
  },
];

const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      <ResizablePanel>
        <AnimatePresence mode="wait">
          <motion.div>
            <div className="my-8">
              <h2 className="text-2xl md:text-4xl font-bold text-center">
                Explore the power of AI
              </h2>
            </div>

            <div className="px-4 md:px-20 lg:px-32 space-y-4">
              {tools.map((tool) => (
                <div
                  className="p-4 rounded-md bg-black/10 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                  onClick={() => router.push(tool.href)}
                >
                  <div className="flex items-center gap-x-4">
                    <div className={`p-2 w-fit rounded-md ${tool.bgColor}`}>
                      <tool.icon className={`w-8 h-8 ${tool.color}`} />
                    </div>
                    <div className="font-semibold">{tool.label}</div>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </ResizablePanel>
    </div>
  );
};

export default Dashboard;
