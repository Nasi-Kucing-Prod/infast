"use client";

import React, { createContext, useState, useContext } from "react";

const DashboardContext = createContext({
  sidebarMenu: false,
  toggleSidebarMenu: () => {},
});

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarMenu, setSidebarMenu] = useState(false);

  const toggleSidebarMenu = () => {
    setSidebarMenu((prevState) => !prevState);
    console.log(sidebarMenu);
  };

  return (
    <DashboardContext.Provider value={{ sidebarMenu, toggleSidebarMenu }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
