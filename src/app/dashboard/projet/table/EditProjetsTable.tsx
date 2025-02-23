"use client";
import { TableData } from "@/app/dashboard/stateManagement/tableData";
import { FullProjet } from "@/app/types/prismaType";
import { TbLoader2 } from "react-icons/tb";
import Formulaire from "../../stateManagement/formulaire";
import { FormProjet } from "../formProjet";
import { useProjets } from "../useProjets";
import { columnsProjet } from "./columnsProjet";

export default function EditProjetTable() {
  const {
    datas,
    //updateStore,
    fetchQuery,
    mutateAdd,
    mutateUpdate,
    mutateRemove,
  } = useProjets();

  if (fetchQuery.isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <TbLoader2 className="animate-spin" size={52} />
      </div>
    );

  if (fetchQuery.error instanceof Error) return <div>Erreur</div>;

  return (
    <section className="relative w-full h-full">
      <h2 className="h2">Projets</h2>
      <TableData<FullProjet>
        filter="title"
        datas={datas}
        isLoadingDatas={fetchQuery.isLoading}
        remove={mutateRemove.mutate}
        columnsData={columnsProjet()}
      />
      <Formulaire mutateAdd={mutateAdd} mutateUpdate={mutateUpdate}>
        <FormProjet />
      </Formulaire>
    </section>
  );
}
