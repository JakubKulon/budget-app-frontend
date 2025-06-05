import { EntryType } from "@/types/api";
import { formatTimestamp } from "@/app/utils/formatTimestamp";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";

type BudgetTableUIType = {
  data: EntryType[];
};

export function BudgetTableUI({ data }: BudgetTableUIType) {
  const columnHelper = createColumnHelper<EntryType>();

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
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'createDate',
          desc: true,
        },
      ],
    },
  });

  return (
    <table className="table-fixed w-full rounded-md bg-gray-800 text-gray-300">
      <thead className="border-b border-gray-500">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="text-left">
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
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
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
