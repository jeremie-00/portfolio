"use client";

import { SectionType } from "@/app/types/prismaType";
import Formulaire from "../../stateManagement/formulaire";
import { TableData } from "../../stateManagement/tableData";
import FormSections from "../formSections";
import { useSections } from "../useSections";
import { columnsSections } from "./columnsSections";

export default function EditSectionsTable() {
  const { datas, fetchQuery, mutateAdd, mutateUpdate, mutateRemove } =
    useSections();
  return (
    <>
      <h2 className="h2">Titre et texte des sections</h2>
      <TableData<SectionType>
        filter="title"
        datas={datas}
        isLoadingDatas={fetchQuery.isLoading}
        remove={mutateRemove.mutate}
        columnsData={columnsSections()}
      />
      <Formulaire mutateAdd={mutateAdd} mutateUpdate={mutateUpdate}>
        <FormSections />
      </Formulaire>
    </>
  );
}
