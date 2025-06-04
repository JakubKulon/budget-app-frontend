"use client";

import Providers from "./provider";
import { BudgetTable } from "./components/budgetTable";

export default function Home() {
  return (
    <Providers>
      <BudgetTable />
    </Providers>
  );
}
