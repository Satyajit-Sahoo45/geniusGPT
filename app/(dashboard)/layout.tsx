"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useUser } from "../../hooks/useUser";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  return (
    user && (
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
          <Sidebar />
        </div>
        <main className="md:pl-72">
          {/* <Header /> */}
          {children}
        </main>
      </div>
    )
  );
};

export default DashboardLayout;
