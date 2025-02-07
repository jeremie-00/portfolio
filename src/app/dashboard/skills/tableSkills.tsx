"use client";

import { FullSkill } from "@/app/types/prismaType";
import { TableData } from "../../components/tableData";

import { columnsSkills } from "./columnsSkills";
import { FormSkills } from "./formSkills";
import { useSkillActions, useSkillState } from "./providersSkills";

export default function TableSkill() {
  const { loading, data, showForm } = useSkillState();
  const { setData, setShowForm, remove, handleShowFormForUpdate } =
    useSkillActions();
  return (
    <section className="relative w-full h-full">
      <h2 className="h2">Compétences</h2>
      <TableData<FullSkill>
        filter="title"
        loading={loading}
        datas={data}
        setData={setData}
        showForm={showForm}
        setShowForm={setShowForm}
        remove={remove}
        columnsData={columnsSkills({ handleShowFormForUpdate })}
      />

      <FormSkills />
    </section>
  );
}
