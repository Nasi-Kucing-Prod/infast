import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Infast",
  description: "Streamline investment tracking",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="px-16 max-[1017px]:px-5 min-h-screen mt-20">
        {children}
      </div>
      <Footer />
    </>
  );
}
