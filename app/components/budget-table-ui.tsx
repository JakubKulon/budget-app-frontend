import { EntryType } from "@/types/api";
import { formatTimestamp } from "@/utils/formatTimestamp";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
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
    }),
    columnHelper.accessor("value", {
      header: "Value",
      cell: (info) => `${info.getValue()} zł`,
      enableSorting: true,
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("occurrence", {
      header: "Occurrence",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("createDate", {
      header: "Create Date",
      cell: (info) => formatTimestamp(info.getValue()) || "N/A",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
