import { Button } from "@/app/components/buttons/buttons";
import { FullProjet } from "@/app/types/prismaType";
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

export const columnsProjet = (): ColumnDef<FullProjet>[] => [
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
            Titre
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="ml-2">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "shortDesc",
    header: () => (
      <div className="text-left text-primary font-bold">Description courte</div>
    ),
    cell: ({ row }) => <div>{row.getValue("shortDesc")}</div>,
  },
  {
    accessorKey: "longDesc",
    header: () => (
      <div className="text-left text-primary font-bold">Description longue</div>
    ),
    cell: ({ row }) => <div>{row.getValue("longDesc")}</div>,
  },
  {
    accessorKey: "skills",
    header: () => (
      <div className="text-left text-primary font-bold">Compétences</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          {row.original.skills?.map((skill, i) => (
            <div key={i}>{skill.title}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "links",
    header: () => <div className="text-left text-primary font-bold">Liens</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap">
          {row.original.links?.map((link, i) => (
            <div key={i}>{link.title}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "urlCover",
    header: () => (
      <div className="text-left text-primary font-bold">URL cover</div>
    ),
    cell: ({ row }) => {
      const url = row.original.cover?.url;
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
    accessorKey: "cover", // Cast nécessaire pour TypeScript
    header: () => (
      <div className="text-center text-primary font-bold">Image cover</div>
    ),
    cell: ({ row }) => {
      const url = row.original.cover?.url;
      const alt = row.original.cover?.alt;
      return (
        <Image
          src={url || "/default.svg"}
          alt={alt || "default"}
          width={150}
          height={150}
          className="max-w-fit aspect-imgCardProjet object-contain w-24 h-24 place-self-center"
        />
      );
    },
  },
  {
    accessorKey: "altCover", // Cast nécessaire pour TypeScript
    header: () => (
      <div className="text-left text-primary font-bold">Text Alt cover</div>
    ),
    cell: ({ row }) => {
      const value = row.original.cover?.alt;
      return <div className="text-left">{String(value)}</div>;
    },
  },
  {
    accessorKey: "medias", // Cast nécessaire pour TypeScript
    header: () => (
      <div className="text-left text-primary font-bold">Medias</div>
    ),
    cell: ({ row }) => {
      const lengthMedias = row.original.medias?.length;
      return <div className="text-left">{lengthMedias}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="font-extrabold text-primary">Actions</div>,
    cell: ActionCell, // Utilisation du composant React
  },
];

function ActionCell({ row }: { row: { original: FullProjet } }) {
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
          onClick={() => navigator.clipboard.writeText(data.cover?.url || "")}
        >
          Copy URL cover
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
