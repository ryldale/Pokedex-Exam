import type { Metadata } from "next";
import "../core/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/shared/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Front End Exam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-[url('/img/Background.png')] bg-cover bg-no-repeat bg-center m-0 p-[40px_32px_24px_32px]`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
