"use client";

import { FullSkill } from "@/app/types/prismaType";
import { TableData } from "../tableData";

import { columnsSkills } from "./columnsSkills";
import { FormSkills } from "./formSkills";
import { useSkillActions, useSkillState } from "./providersSkills";

export default function TableSkill() {
  const { loading, data, showForm } = useSkillState();
  const { setData, setShowForm, remove, handleShowFormForUpdate } =
    useSkillActions();
  return (
    <div className="relative w-full h-full">
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
    </div>
  );
}
