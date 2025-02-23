import { FullLink } from "@/app/types/prismaType";

import { useLinks } from "@/app/dashboard/link/useLinks";
import Formulaire from "@/app/dashboard/stateManagement/formulaire";
import { TableData } from "@/app/dashboard/stateManagement/tableData";

import { TbLoader2 } from "react-icons/tb";
import { columnsLink } from "./columnsLink";
import FormLink from "../formLink";

export default function EditLinksTable() {
  const {
    datas,
    //updateStore,
    fetchQuery,
    mutateAdd,
    mutateUpdate,
    mutateRemove,
  } = useLinks();

  if (fetchQuery.isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <TbLoader2 className="animate-spin" size={52} />
      </div>
    );

  if (fetchQuery.error instanceof Error) return <div>Erreur</div>;

  return (
    <>
      <h2 className="h2">Liens</h2>
      <TableData<FullLink>
        filter="order"
        datas={datas}
        isLoadingDatas={fetchQuery.isLoading}
        remove={mutateRemove.mutate}
        columnsData={columnsLink()}
      />
      <Formulaire mutateAdd={mutateAdd} mutateUpdate={mutateUpdate}>
        <FormLink />
      </Formulaire>
    </>
  );
}
