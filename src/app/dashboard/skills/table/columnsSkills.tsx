import { Button } from "@/app/components/buttons/buttons";
import { FullSkill } from "@/app/types/prismaType";
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
import { useFormulaire } from "../../stateManagement/formulaireContext";

export const columnsSkills = (): ColumnDef<FullSkill>[] => [
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
    header: () => (
      <div className="text-center text-primary font-bold">Image</div>
    ),
    cell: ({ row }) => {
      const url = row.original.image?.url;
      const alt = row.original.image?.alt;
      return (
        <Image
          src={url || "/default.svg"}
          alt={alt || "default"}
          width={150}
          height={150}
          className="max-w-fit aspect-imgCardProjet object-contain w-16 h-16 place-self-center"
        />
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
    header: () => <div className="font-extrabold text-primary">Actions</div>,
    cell: ActionCell, // Utilisation du composant React
  },
];

function ActionCell({ row }: { row: { original: FullSkill } }) {
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
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigator.clipboard.writeText(data.image?.url || "")}
        >
          Copy URL cover
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
