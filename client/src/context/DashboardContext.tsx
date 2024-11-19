"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

interface TickerDashboard { 
  currency_symbol: string;
  name: string;
  latest_price: number;
  change_percentage: number;
  market: string;
}

interface DashboardContextType {
  sidebarMenu: boolean;
  toggleSidebarMenu: () => void;
  watchlist: string[];
  data: TickerDashboard[];
  setWatchlist: React.Dispatch<React.SetStateAction<string[]>>;
  setData: React.Dispatch<React.SetStateAction<TickerDashboard[]>>;
  userId: number | null;
}

interface GetCurrentUserResponse {
  userId: number;
  watchlist: string[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarMenu, setSidebarMenu] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>([]); 
  const [data, setData] = useState<TickerDashboard[]>([]); 
  const [userId, setUserId] = useState<number | null>(null); 

  const toggleSidebarMenu = () => {
    setSidebarMenu((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchCurrentUserWatchlist = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token tidak ditemukan. Pastikan token sudah disimpan di localStorage.");
          return;
        }

        const response = await fetch("/signup/api/getCurrentUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const result: GetCurrentUserResponse = await response.json();
          setUserId(result.userId);
          setWatchlist([...new Set(result.watchlist || [])] as string[]);
          console.log("Watchlist setelah fetch:", [...new Set(result.watchlist || [])] as string[]);
        } else {
          const errorData = await response.json();
          console.error("Gagal mengambil watchlist pengguna:", errorData.message);
        }
      } catch (error) {
        console.error("Error saat mengambil watchlist pengguna:", error);
      }
    };

    fetchCurrentUserWatchlist();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        sidebarMenu,
        toggleSidebarMenu,
        watchlist,
        data,
        setWatchlist,
        setData,
        userId,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext harus digunakan di dalam DashboardProvider");
  }
  return context;
};
