import { Button } from "@/app/components/buttons/buttons";
import { ColumnsProps } from "@/app/types/globalType";
import { FullAvatar } from "@/app/types/prismaType";
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

export const columnsAvatar = ({
  handleShowFormForUpdate,
}: ColumnsProps): ColumnDef<FullAvatar>[] => [
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
    header: ({ column }) => {
      return (
        <div>
          <Button
            theme="highlight"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-extrabold text-primary"
          >
            Page
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="ml-2">{row.getValue("page")}</div>,
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
    accessorKey: "urlRecto",
    header: () => <div className="text-left text-primary font-bold">URL</div>,
    cell: ({ row }) => {
      const url = row.original.recto?.url;
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
    accessorKey: "recto", // Cast nécessaire pour TypeScript
    header: () => (
      <div className="text-left text-primary font-bold">Image recto</div>
    ),
    cell: ({ row }) => {
      const url = row.original.recto?.url;
      const alt = row.original.recto?.alt;
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
    accessorKey: "altRecto", // Cast nécessaire pour TypeScript
    header: () => (
      <div className="text-left text-primary font-bold">Text Alt recto</div>
    ),
    cell: ({ row }) => {
      const value = row.original.recto?.alt;
      return <div className="text-left">{String(value)}</div>;
    },
  },
  {
    accessorKey: "urlVerso",
    header: () => <div className="text-left text-primary font-bold">URL</div>,
    cell: ({ row }) => {
      const url = row.original.verso?.url;
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
    accessorKey: "verso", // Cast nécessaire pour TypeScript
    header: () => (
      <div className="text-left text-primary font-bold">Image verso</div>
    ),
    cell: ({ row }) => {
      const url = row.original.verso?.url;
      const alt = row.original.verso?.alt;
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
    accessorKey: "altVerso", // Cast nécessaire pour TypeScript
    header: () => (
      <div className="text-left text-primary font-bold">Text Alt verso</div>
    ),
    cell: ({ row }) => {
      const value = row.original.verso?.alt;
      return <div className="text-left">{String(value)}</div>;
    },
  },
  {
    accessorKey: "arrowBullPosition", // Cast nécessaire pour TypeScript
    header: () => (
      <div className="text-left text-primary font-bold">
        Position fleche bulle
      </div>
    ),
    cell: ({ row }) => {
      const value = row.original.arrowBullPosition;
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
      const avatar = row.original;

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
              onClick={() => handleShowFormForUpdate(avatar.id)}
            >
              Modifier
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(avatar.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(avatar.recto?.url || "")
              }
            >
              Copy URL Recto
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(avatar.verso?.url || "")
              }
            >
              Copy URL verso
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
