import { TableData } from "@/app/dashboard/stateManagement/tableData";
import { NotationType } from "@/app/types/prismaType";
import Formulaire from "../../stateManagement/formulaire";
import { columnsNotation } from "./columnsNotation";
import { TbLoader2 } from "react-icons/tb";
import { useNotation } from "../useNotation";
import FormNotations from "../formNotations";

export default function EditNotationTable() {
  const {
    datas,
    //updateStore,
    fetchQuery,
    mutateAdd,
    mutateUpdate,
    mutateRemove,
  } = useNotation();

  if (fetchQuery.isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <TbLoader2 className="animate-spin" size={52} />
      </div>
    );

  if (fetchQuery.error instanceof Error) return <div>Erreur</div>;

  return (
    <>
      <h2 className="h2">Texte avec notation</h2>
      <TableData<NotationType>
        filter="order"
        datas={datas}
        isLoadingDatas={fetchQuery.isLoading}
        remove={mutateRemove.mutate}
        columnsData={columnsNotation()}
      />
      <Formulaire mutateAdd={mutateAdd} mutateUpdate={mutateUpdate}>
        <FormNotations />
      </Formulaire>
    </>
  );
}
