"use client";

import { Button } from "@/app/components/buttons/buttons";
import {
  DeleteButton,
  DialogDelete,
} from "@/app/components/buttons/dialogDelete";
import { showToast } from "@/app/components/toast";

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
import { IoAdd } from "react-icons/io5";
import useDeleted from "../hooks/useDeleted";
import { Result } from "../types/globalType";

interface TableProps<TData extends { id: string }> {
  filter: string;
  loading: boolean;
  datas: TData[];
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  lengthTexts?: number;
  setLengthTexts?: React.Dispatch<React.SetStateAction<number>>;
  order?: number;
  setOrder?: React.Dispatch<React.SetStateAction<number>>;
  remove: ({ id }: { id: string }) => Promise<Result>;
  columnsData: ColumnDef<TData, unknown>[];
}

export function TableData<TData extends { id: string }>({
  filter,
  loading,
  datas,
  setData,
  showForm,
  setShowForm,
  lengthTexts,
  setLengthTexts,
  order,
  setOrder,
  remove,
  columnsData,
}: TableProps<TData>) {
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const {
    loadingDelete,
    setLoadingDelete,
    showDialog,
    deleteId,
    setShowDialog,
    setDeleteId,
    confirmDelete,
    cancelDelete,
  } = useDeleted();

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

  /* Fonction pour supprimer les lignes */
  const handleDelete = async () => {
    setLoadingDelete(true);
    if (deleteId) {
      const response = await Promise.all(
        deleteId.map(async (id) => {
          const res = await remove({ id });
          return res.data;
        })
      );

      response.map((res) => {
        showToast(res.status, res.message);
        if (res.success) {
          setData((prevData) =>
            prevData.filter((item) => !deleteId.includes(item.id))
          );
          setRowSelection({});
        }
      });

      if (lengthTexts && setLengthTexts)
        setLengthTexts(lengthTexts - response.length);
      if (order && setOrder) setOrder(order - response.length);
      setLoadingDelete(false);
      setShowDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="w-full">
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
              onClick={handleShowForm}
              disabled={loading}
              ariaLabel="Ajouter"
            >
              <IoAdd size={24} />
            </Button>

            <DeleteButton
              loading={loadingDelete}
              selectedIds={selectedIds}
              confirmDelete={confirmDelete}
            />

            {showDialog && (
              <DialogDelete
                handleDelete={handleDelete}
                cancelDelete={cancelDelete}
                loading={loadingDelete}
              />
            )}
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
        <div className="rounded-md border">
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
                    {loading ? "Chargement..." : "No results."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
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
      {/*       <Button theme="outline" size="sm" onClick={onClick}>
        Formulaire
      </Button> */}
    </div>
  );
}
