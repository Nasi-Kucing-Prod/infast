import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./signup/context/AuthContext";
import { DashboardProvider } from "@/context/DashboardContext";

export const metadata: Metadata = {
  title: "Infast",
  description: "Streamline investment tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        <AuthProvider>
          <DashboardProvider>{children}</DashboardProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
