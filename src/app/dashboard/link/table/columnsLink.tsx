import { Button } from "@/app/components/buttons/buttons";
import { useFormulaire } from "@/app/dashboard/stateManagement/formulaireContext";
import { FullLink } from "@/app/types/prismaType";
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

export const columnsLink = (): ColumnDef<FullLink>[] => [
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
    accessorKey: "page",
    header: () => <div className="font-extrabold text-primary">Page</div>,
    cell: ({ row }) => (
      <div className="capitalize font-medium">{row.getValue("page")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: () => <div className="font-extrabold text-primary">Titre</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("title")}</div>;
    },
  },

  {
    accessorKey: "inNav",
    header: ({ column }) => {
      return (
        <div className="place-self-center">
          <Button
            theme="highlight"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-extrabold text-primary"
          >
            Navigation
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium text-center">
        {row.getValue("inNav") ? "Oui" : "Non"}
      </div>
    ),
  },

  {
    accessorKey: "href",
    header: () => <div className="font-extrabold text-primary">Lien</div>,
    cell: ({ row }) => {
      return <div className="font-medium ">{row.getValue("href")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="font-extrabold text-primary">Actions</div>,
    cell: ActionCell, // Utilisation du composant React
  },
];

function ActionCell({ row }: { row: { original: FullLink } }) {
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
          onClick={() => navigator.clipboard.writeText(data.href)}
        >
          Copy Href
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
