import type { Metadata } from "next";
import "../globals.css";
import SideBar from "@/components/SideBar";
import { DashboardProvider } from "@/context/DashboardContext";

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
    <DashboardProvider>
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </DashboardProvider>
  );
}
