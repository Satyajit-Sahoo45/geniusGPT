"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import UseAuthModal from "../hooks/UseAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "../hooks/useUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";

export default function Header() {
  const authModal = UseAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    // handle logout feature
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  return (
    <header className="xs:flex-row flex justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 ">
      <Link href="/">
        <Image
          alt="header text"
          src="/genius.svg"
          // className="sm:w-10 sm:h-10 w-9 h-9"
          width={200}
          height={300}
        />
      </Link>
      <div className=" flex gap-2">
        {user ? (
          <div className="flex gap-x-4 items-center">
            <Button
              onClick={handleLogout}
              className="bg-white text-slate-800 px-6 py-2 hover:text-neutral-300
            hover:bg-zinc-500"
            >
              Logout
            </Button>

            <Button
              onClick={() => router.push("/account")}
              className="bg-white text-slate-800 hover:text-neutral-300
            hover:bg-zinc-500"
            >
              <FaUserAlt />
            </Button>
          </div>
        ) : (
          <>
            <div>
              <Button
                onClick={authModal.onOpen}
                className="
            bg-transparent
            text-neutral-300
            font-medium
            "
              >
                Sign Up
              </Button>
            </div>
            <div>
              <Button
                onClick={authModal.onOpen}
                className="
            bg-white
            text-slate-800
            hover:text-neutral-300
            hover:bg-zinc-500
            rounded-2xl
            px-6
            py-2
            "
              >
                Log in
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
