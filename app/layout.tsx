import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "../styles/globals.css";
import SupabaseProvider from "../providers/SupabaseProvider";
import ModalProvider from "../providers/ModalProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#17181C] text-white">
        <NextTopLoader />
        <SupabaseProvider>
          <ModalProvider />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
