import { ChartDashboard } from "@/components/ChartDashboard";
import { DashboardHeader } from "@/components/DashboardHeader";
import NewsDashboard from "@/components/NewsDashboard";
import TableDashboard from "@/components/TableDashboard";

export default function MarketCrypto() {
  return (
    <main className="bg-gray-100 w-full px-5 pb-5 m-2 rounded-3xl">
      <DashboardHeader />
      <div className="space-y-5">
        <ChartDashboard />
        <div className="flex flex-col md:flex-row w-full gap-5 ">
          <NewsDashboard />
          <TableDashboard />
        </div>
      </div>
    </main>
  );
}
