"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useUser } from "../../hooks/useUser";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const { supabaseClient } = useSessionContext();
  const [apiLimitCount, setApiLimitCount] = useState<number>(0);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const getApiCountLimit = async () => {
    if (!user) {
      return false;
    }

    try {
      const { data: userApiLimit, error: fetchError } = await supabaseClient
        .from("UserApiLimit")
        .select("*")
        .eq("userid", user.id)
        .single();

      if (userApiLimit === null) {
        toast.error("Error fetching user API limit");
        return false;
      }

      if (!userApiLimit) {
        return 0;
      }

      setApiLimitCount(userApiLimit?.count || 0);
    } catch (error: any) {
      // console.error("Unexpected error:", error);
      toast.error(error.message);
      return false;
    }
  };

  getApiCountLimit();

  return (
    user && (
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
          <Sidebar apiLimitCount={apiLimitCount} />
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
