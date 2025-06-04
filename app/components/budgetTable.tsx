import { BudgetApiQuery } from "@/utils/apiQuery";
import { useQuery } from "@tanstack/react-query";
import { BudgetTableUI } from "./budget-table-ui";

export function BudgetTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["entries"],
    queryFn: BudgetApiQuery.getEntries,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1>Budget App</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1>Budget App</h1>
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  if (data) {
    return <BudgetTableUI data={data.data} />;
  }
}
