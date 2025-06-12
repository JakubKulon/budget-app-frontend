import { EntryType } from "@/types/api";
import { formatTimestamp } from "@/app/utils/formatTimestamp";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BudgetApiQuery } from "@/app/utils/apiQuery";
import { Button } from "../button";

type BudgetTableUIType = {
  data: EntryType[];
};

export function BudgetTableUI({ data }: BudgetTableUIType) {
  const columnHelper = createColumnHelper<EntryType>();
  const queryClient = useQueryClient();

  const deleteEntryMutation = useMutation({
    mutationFn: BudgetApiQuery.deleteEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      deleteEntryMutation.reset();
    },
    onError: (error) => {
      console.error("Error removing entry:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    },
  });

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("value", {
      header: "Value",
      cell: (info) => `${info.getValue()} zł`,
      enableSorting: true,
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => info.getValue() || "N/A",
      enableSorting: true,
    }),
    columnHelper.accessor("occurrence", {
      header: "Occurrence",
      cell: (info) => info.getValue() || "N/A",
      enableSorting: true,
    }),
    columnHelper.accessor("createDate", {
      header: "Create Date",
      cell: (info) => formatTimestamp(info.getValue()) || "N/A",
      enableSorting: true,
    }),
    columnHelper.accessor("id", {
      id: "remove",
      header: "Delete",
      cell: (item) => (
        <Button
          onClick={() => deleteEntryMutation.mutate(item.getValue())}
          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          title="Remove entry"
        >
          Remove
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: "createDate",
          desc: true,
        },
      ],
    },
  });

  return (
    <table className="table-auto w-full rounded-md bg-gray-800 ">
      <thead className="border-b border-gray-500 bg-gray-900">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="text-left text-gray-400">
                <div
                  className={
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : ""
                  }
                  onClick={header.column.getToggleSortingHandler()}
                  title={
                    header.column.getCanSort()
                      ? header.column.getNextSortingOrder() === "asc"
                        ? "Sort ascending"
                        : header.column.getNextSortingOrder() === "desc"
                          ? "Sort descending"
                          : "Clear sort"
                      : undefined
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-gray-800 text-gray-500">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b border-b-gray-700">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
