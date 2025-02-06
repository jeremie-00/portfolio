"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/app/components/buttons/buttons";
import { ColumnsProps } from "@/app/types/globalType";
import { NotationType } from "@/app/types/prismaType";
import { Checkbox } from "@/components/ui/checkbox";

export const columnsNotation = ({
  handleShowFormForUpdate,
}: ColumnsProps): ColumnDef<NotationType>[] => [
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
      return (
        <div className="w-[14rem] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
          {row.getValue("text")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="font-extrabold text-primary">Actions</div>,
    cell: ({ row }) => {
      const textNotation = row.original;

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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(textNotation.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleShowFormForUpdate(textNotation.id)}
            >
              Modifier
            </DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

/*   const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [showDialog, setShowDialog] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string[] | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [pages, setPages] = React.useState<string[]>([]);
  const [tableData, setTableData] = React.useState<
    Prisma.TextNotationGetPayload<true>[]
  >([]);

  const [lengthTexts, setLengthTexts] = React.useState(0);

  React.useEffect(() => {
    showToast("success", "Bienvenue sur cette page !");
  }, []);

     React.useEffect(() => {
    setLoading(true);
    const fetchPages = async () => {
      const links = await getNavLinks();
      const pagesList = links.map((link) => link.page);
      setPages(pagesList);
    };
    fetchPages();
    const fetchData = async () => {
      const texts = await getTextNotation();
      setTableData(texts);
      if (texts.length > 0) {
        setLoading(false);
        setLengthTexts(texts.length + 1);
      } else if (texts.length === 0) {
        setLoading(false);
        setLengthTexts(texts.length + 1);
                setTableData([]);
        handleReset();
      }
    };
    fetchData();
  }, []); 

  const table = useReactTable({
    data: tableData,
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

  const selectedIds = Object.keys(table.getState().rowSelection).map(
    (key) => tableData[parseInt(key)]?.id
  );

  const handleShowForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      handleReset();
    }
  };

  const [update, setUpdate] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState("");
  const [selectedTextNotation, setSelectedTextNotation] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedPage, setSelectedPage] = React.useState("");
  const [selectedOrder, setSelectedOrder] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState("");

  const handleShowFormForUpdate = (id: string) => {
    setUpdate(true);
    setSelectedId(id);
    const data = tableData.find((text) => text.id === id);
    if (data) {
      setSelectedText(data.text || "");
      setSelectedType(data.type || "");
      setSelectedPage(data.page);
      setSelectedTextNotation(data.textNotation || "");
      setSelectedOrder(data.order);
      setShowForm(!showForm);
    }
  };

  const confirmDelete = (id: string[]) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  const cancelDelete = () => {
    setShowDialog(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    setLoading(true);
    if (deleteId) {
      const response = await Promise.all(
        deleteId.map((id) => {
          const res = deleteTextNotation(id);
          return res;
        })
      );

      setLengthTexts(lengthTexts - response.length);
      response.map((res) => {
        if (res.id) {
          showToast("success", "Votre texte a été supprimé avec succès ! 🚀");
          setTableData((prevData) =>
            prevData.filter((item) => !deleteId.includes(item.id))
          );

          setRowSelection({});
        } else {
          showToast("error", "Une erreur est survenue lors de la suppression");
        }
      });
      setLoading(false);
      setShowDialog(false);
      setDeleteId(null);
    }
  };

  const handleOrder = () => {};

  const BtnSubmit = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        type="submit"
        theme="primary"
        size="sm"
        className="w-fit place-self-center"
        disabled={pending}
      >
        {pending ? "Validation en cours..." : "Valider"}
      </Button>
    );
  };

  const handleReset = () => {
    setSelectedText("");
    setSelectedType("");
    setSelectedPage("");
    setSelectedTextNotation("");
    setSelectedOrder(0);
    setUpdate(false);
    setSelectedId("");
  };

  const handleSubmit = async (formData: FormData) => {
    if (update) {
      const response = await updateTextNotation(formData);
      if (response?.id) {
        showToast("success", "Votre texte a été modifié avec succès ! 🚀");
      } else if (response?.empty) {
        showToast(
          "warn",
          "Une valeur est manquante ou invalide, veuillez vérifier vos données"
        );
      } else {
        showToast(
          "error",
          "Une erreur est survenue lors de la modification du texte"
        );
      }
    } else {
      const response = await createTextNotation(formData);
      if (response?.id) {
        showToast("success", "Votre texte a été créé avec succès ! 🚀");
        //handleShowForm();
      } else if (response?.empty) {
        showToast(
          "warn",
          "Une valeur est manquante ou invalide, veuillez vérifier vos données"
        );
      } else {
        showToast(
          "error",
          "Une erreur est survenue lors de la création du texte"
        );
      }
    }
    const fetchData = async () => {
      const texts = await getTextNotation();
      setTableData(texts);
      if (texts.length > 0) {
        setLoading(false);
        setLengthTexts(texts.length + 1);
      } else {
        setLoading(true);
      }
    };
    fetchData();
    handleReset();
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPage(event.target.value);
  };

  const handleChangeTextNotation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedTextNotation(event.target.value);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedText(event.target.value);
  };

  return (
    <div className="w-full">
      {showForm && (
        <div className="modal px-40">
          <Form
            action={handleSubmit}
            className="w-full h-fit flex flex-col bg-section gap-12 p-6 shadow-custom rounded-xl"
          >
            <h2 className="h2-form">Texte avec Notation</h2>
            <input type="hidden" name="id" value={selectedId} />
            <label htmlFor="page" className="label-form">
              Sélectioner la page
              <select
                name="page"
                id="page"
                value={selectedPage}
                onChange={handleChangePage}
              >
                {pages.map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="type" className="label-form">
              Sélection du type de notation
              <select
                name="type"
                id="type"
                value={selectedType}
                onChange={handleChangeType}
              >
                <option value="underline">Underline</option>
                <option value="highlight">Highlight</option>
                <option value="box">Box</option>
                <option value="circle">Circle</option>
              </select>
            </label>

            <label htmlFor="order" className="label-form">
              Ordre
              <input
                type="number"
                name="order"
                id="order"
                placeholder="Enter order"
                value={selectedOrder ? selectedOrder : lengthTexts}
                onChange={handleOrder}
              />
            </label>

            <label htmlFor="textNotation" className="label-form">
              Texte Notation
              <input
                type="textNotation"
                name="textNotation"
                id="textNotation"
                placeholder="Enter text notation"
                value={selectedTextNotation}
                onChange={handleChangeTextNotation}
              />
            </label>

            <label htmlFor="text" className="label-form">
              Texte
              <input
                type="text"
                name="text"
                id="text"
                placeholder="Enter text"
                value={selectedText}
                onChange={handleChangeText}
              />
            </label>
            <div className="flex items-center justify-between p-4">
              <Button theme="outline" size="sm" onClick={handleShowForm}>
                Quitter
              </Button>
              <BtnSubmit />
            </div>
          </Form>
        </div>
      )}
      <div className="flex items-center py-4">
        <input
          placeholder="Filter order..."
          value={(table.getColumn("order")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("order")?.setFilterValue(event.target.value)
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
          <Button
            theme="delete"
            onClick={() => confirmDelete(selectedIds)}
            disabled={loading || selectedIds.length === 0}
            ariaLabel="Supprimer"
          >
            <IoTrash size={24} />
          </Button>

          {showDialog && (
            <DialogDelete
              handleDelete={handleDelete}
              cancelDelete={cancelDelete}
              loading={loading}
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
  );
} */
