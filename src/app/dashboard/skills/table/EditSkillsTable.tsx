"use client";
import { TableData } from "@/app/dashboard/stateManagement/tableData";
import { FullSkill } from "@/app/types/prismaType";
import Formulaire from "../../stateManagement/formulaire";
import { useSkills } from "../useSkills";
import { columnsSkills } from "./columnsSkills";
import { FormSkills } from "../formSkills";

export default function EditSkillsTable() {
  const { datas, fetchQuery, mutateAdd, mutateUpdate, mutateRemove } =
    useSkills();

  return (
    <>
      <h2 className="h2">Compétences</h2>
      <TableData<FullSkill>
        filter="title"
        datas={datas}
        isLoadingDatas={fetchQuery.isLoading}
        remove={mutateRemove.mutate}
        columnsData={columnsSkills()}
      />
      <Formulaire mutateAdd={mutateAdd} mutateUpdate={mutateUpdate}>
        <FormSkills />
      </Formulaire>
    </>
  );
}
