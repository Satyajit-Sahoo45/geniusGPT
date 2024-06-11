import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "../styles/globals.css";
import SupabaseProvider from "../providers/SupabaseProvider";
import ModalProvider from "../providers/ModalProvider";
import ToasterProvider from "../providers/ToasterProvider";
import UserProvider from "../providers/UserProvider";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#17181C] text-white">
        <ToasterProvider />
        <NextTopLoader />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            {children}
            <Analytics />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
