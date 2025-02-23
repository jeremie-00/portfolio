import { FullAbout } from "@/app/types/prismaType";
import Formulaire from "../../stateManagement/formulaire";
import { TableData } from "../../stateManagement/tableData";
import { FormAbout } from "../formAbout";
import { useAbout } from "../useAbouts";
import { columnsAbout } from "./columnsAbout";

export default function EditAboutTable() {
  const { datas, fetchQuery, mutateAdd, mutateUpdate, mutateRemove } =
    useAbout();
  return (
    <>
      <h2 className="h2">A propos</h2>
      <TableData<FullAbout>
        filter="text"
        datas={datas}
        isLoadingDatas={fetchQuery.isLoading}
        remove={mutateRemove.mutate}
        columnsData={columnsAbout()}
      />
      <Formulaire mutateAdd={mutateAdd} mutateUpdate={mutateUpdate}>
        <FormAbout />
      </Formulaire>
    </>
  );
}
