import { Button } from "@/app/components/buttons/buttons";
import { ColumnsProps } from "@/app/types/globalType";
import { FullAbout } from "@/app/types/prismaType";
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
import Image from "next/image";
import Link from "next/link";

export const columnsAbout = ({
  handleShowFormForUpdate,
}: ColumnsProps): ColumnDef<FullAbout>[] => [
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
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <div>
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
    cell: ({ row }) => <div className="ml-2">{row.getValue("order")}</div>,
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
    cell: ({ row }) => <div className="ml-2">{row.getValue("text")}</div>,
  },
  {
    accessorKey: "url",
    header: () => <div className="text-left text-primary font-bold">URL</div>,
    cell: ({ row }) => {
      const url = row.original.image?.url;
      return (
        <div className="w-[14rem] overflow-hidden text-ellipsis whitespace-nowrap">
          <Link href={(url && url) || ""} target="_blank">
            {url}
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: "image", // Cast nécessaire pour TypeScript
    header: () => <div className="text-left text-primary font-bold">Image</div>,
    cell: ({ row }) => {
      const url = row.original.image?.url;
      const alt = row.original.image?.alt;
      return (
        <div className="text-left">
          <Image
            src={url || "/default.svg"}
            alt={alt || "default"}
            width={50}
            height={50}
            className="inline-block w-8 h-8"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "alt", // Cast nécessaire pour TypeScript
    header: () => (
      <div className="text-left text-primary font-bold">Text Alt</div>
    ),
    cell: ({ row }) => {
      const value = row.original.image?.alt;
      return <div className="text-left">{String(value)}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => (
      <div className="text-center text-primary font-bold">Actions</div>
    ),
    cell: ({ row }) => {
      const about = row.original;

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
              onClick={() => handleShowFormForUpdate(about.id)}
            >
              Modifier
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(about.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(about?.image?.url || "")
              }
            >
              Copy URL
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
