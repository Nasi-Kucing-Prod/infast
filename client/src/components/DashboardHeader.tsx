"use client";

import { usePathname } from "next/navigation";
import { Slash } from "lucide-react";
import { PanelLeftOpen } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useDashboardContext } from "@/context/DashboardContext";
import Profile from "./Profile";

export const DashboardHeader = () => {
  const { sidebarMenu, toggleSidebarMenu } = useDashboardContext();
  const pathname = usePathname(); // Mendapatkan path URL saat ini

  // Ambil bagian terakhir dari path
  const menu = pathname.split("/").pop();

  return (
    <section className="flex justify-between items-center px-5 p-3">
      <button className="block md:hidden" onClick={() => toggleSidebarMenu()}>
        <PanelLeftOpen />
      </button>
      <Breadcrumb className="px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          {menu && menu !== "dashboard" && (
            <>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-infast capitalize">
                  {menu}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-5 items-center text-end">
        <Profile />
      </div>
    </section>
  );
};
