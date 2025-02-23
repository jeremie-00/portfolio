"use client";

import { Button } from "@/app/components/buttons/buttons";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { IoAdd, IoTrash } from "react-icons/io5";
import { useFormulaire } from "./formulaireContext";
import { useDeleteModal } from "./modalContext";

interface TableProps<T extends { id: string }> {
  filter: string;
  datas: T[];
  isLoadingDatas: boolean;
  remove: ({ id }: { id: string }) => void;
  columnsData: ColumnDef<T, unknown>[];
}

export function TableData<T extends { id: string }>({
  filter,
  datas,
  isLoadingDatas,
  remove,
  columnsData,
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  /* Fonction pour créer les colonnes */
  const columns = columnsData;

  /* Tableau */
  const table = useReactTable({
    data: datas,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  /* Selection des lignes */
  const selectedIds = Object.keys(table.getState().rowSelection).map(
    (key) => datas[parseInt(key)].id
  );

  const { openModal } = useDeleteModal();
  const { openFormulaire } = useFormulaire();

  /* Fonction pour supprimer les lignes */
  const handleDelete = async (selectedIds: string[]) => {
    if (selectedIds.length > 0) {
      selectedIds.map((id) => {
        remove({ id });
      });
      setRowSelection({});
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <input
          placeholder={`Filter ${filter}...`}
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filter)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="w-full flex items-center justify-center gap-4">
          <Button
            theme="primary"
            size="sm"
            onClick={() => openFormulaire()}
            disabled={isLoadingDatas}
            ariaLabel="Ajouter"
          >
            <IoAdd size={24} />
          </Button>

          <Button
            theme="delete"
            size="sm"
            onClick={() =>
              openModal(
                selectedIds.length > 1
                  ? "Supprimer les éléments ?"
                  : "Supprimer cet élément ?",
                `Cette action est irréversible.`,
                () => handleDelete(selectedIds)
              )
            }
            disabled={selectedIds.length === 0}
            ariaLabel="Supprimer"
          >
            <IoTrash size={24} />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-full flex flex-1 items-center justify-end">
              <Button theme="outline" size="sm" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border border-foreground bg-section">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoadingDatas ? "Chargement..." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex space-x-2">
          <Button
            theme="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            theme="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
