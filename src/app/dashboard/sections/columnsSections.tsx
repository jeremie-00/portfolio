import { Button } from "@/app/components/buttons/buttons";
import { ColumnsProps } from "@/app/types/globalType";
import { SectionType } from "@/app/types/prismaType";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columnsSections = ({
  handleShowFormForUpdate,
}: ColumnsProps): ColumnDef<SectionType>[] => [
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
    accessorKey: "section",
    header: ({ column }) => {
      return (
        <div>
          <Button
            theme="highlight"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-extrabold text-primary"
          >
            Section
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize ml-2">{row.getValue("section")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div>
          <Button
            theme="highlight"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-extrabold text-primary"
          >
            Title
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize ml-2">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "text",
    header: ({ column }) => {
      return (
        <div>
          <Button
            theme="highlight"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-extrabold text-primary"
          >
            Texte
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize ml-2">{row.getValue("text")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    header: () => (
      <div className="text-center text-primary font-bold">Actions</div>
    ),
    cell: ({ row }) => {
      const skill = row.original;

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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleShowFormForUpdate(skill.id)}
            >
              Modifier
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(skill.id)}
            >
              Copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
