"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/app/components/buttons/buttons";
import { NotationType } from "@/app/types/prismaType";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormulaire } from "../../stateManagement/formulaireContext";

export const columnsNotation = (): ColumnDef<NotationType>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "page",
    header: () => <div className="font-extrabold text-primary">Page</div>,
    cell: ({ row }) => (
      <div className="capitalize font-medium">{row.getValue("page")}</div>
    ),
  },
  {
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <div className="place-self-center">
          <Button
            theme="highlight"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-extrabold text-primary"
          >
            Ordre
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium text-center">{row.getValue("order")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div className="font-extrabold text-primary">Type</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("type")}</div>;
    },
  },
  {
    accessorKey: "textNotation",
    header: () => (
      <div className="font-extrabold text-primary">Texte Notation</div>
    ),
    cell: ({ row }) => {
      return <div className="font-medium ">{row.getValue("textNotation")}</div>;
    },
  },
  {
    accessorKey: "text",
    header: () => <div className="font-extrabold text-primary">Texte</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("text")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="font-extrabold text-primary">Actions</div>,
    cell: ActionCell, // Utilisation du composant React
  },
];

function ActionCell({ row }: { row: { original: NotationType } }) {
  const data = row.original;
  const { openFormulaire } = useFormulaire(); // Hook utilisé dans un composant React valide

  const handleEdit = () => {
    openFormulaire(data.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center">
          <Button theme="icon" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
          Modifier
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigator.clipboard.writeText(data.id)}
        >
          Copy ID
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
