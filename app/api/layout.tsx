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
        <main className="md:pl-72">{children}</main>
      </div>
    )
  );
};

export default DashboardLayout;
