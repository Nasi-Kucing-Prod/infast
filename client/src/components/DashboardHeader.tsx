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
import Profile from './Profile';

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
        <Profile />
      </div>
    </section>
  );
};
