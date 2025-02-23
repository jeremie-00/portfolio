import { FullAvatar } from "@/app/types/prismaType";
import { TableData } from "../../stateManagement/tableData";

import Formulaire from "../../stateManagement/formulaire";
import { FormAvatar } from "../formAvatar";
import { useAvatar } from "../useAvatar";
import { columnsAvatar } from "./columnsAvatar";

export default function EditAvatarTable() {
  const { datas, fetchQuery, mutateAdd, mutateUpdate, mutateRemove } =
    useAvatar();
  return (
    <>
      <h2 className="h2">Avatar</h2>
      <TableData<FullAvatar>
        filter="text"
        datas={datas}
        isLoadingDatas={fetchQuery.isLoading}
        remove={mutateRemove.mutate}
        columnsData={columnsAvatar()}
      />
      <Formulaire mutateAdd={mutateAdd} mutateUpdate={mutateUpdate}>
        <FormAvatar />
      </Formulaire>
    </>
  );
}
