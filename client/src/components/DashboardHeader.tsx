"use client";

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

export const DashboardHeader = () => {
  const { sidebarMenu, toggleSidebarMenu } = useDashboardContext();

  return (
    <section className="flex justify-between  items-center px-5 p-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-emerald-800">Market</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-5 items-center">
        <button className="block md:hidden" onClick={() => toggleSidebarMenu()}>
          <PanelLeftOpen />
        </button>
        <div className="flex gap-2 items-center">
          <div className="text-right">
            <h2 className="text-sm">User 1</h2>
            <h3 className="text-xs">ID: 3133</h3>
          </div>
          <div className="bg-emerald-200/30 text-emerald-800 border-2 border-emerald-400/30 rounded-full p-2 w-10 h-10 flex items-center justify-center">
            ?
          </div>
        </div>
      </div>
    </section>
  );
};
