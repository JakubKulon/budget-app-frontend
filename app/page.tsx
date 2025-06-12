"use client";

import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "./ui/sidebar";
import { BudgetApiQuery } from "./utils/apiQuery";
import { BudgetTableUI } from "./ui/budget-table";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["entries"],
    queryFn: BudgetApiQuery.getEntries,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1>Budget App</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1>Budget App</h1>
        <p className="text-red-600">Error!</p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex gap-3 p-8">
        <Sidebar />
        <BudgetTableUI data={data.data} />;
      </div>
    );
  }
}
