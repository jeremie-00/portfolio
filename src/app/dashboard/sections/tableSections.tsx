"use client";

import { SectionType } from "@/app/types/prismaType";
import { TableData } from "../tableData";

import { columnsSections } from "./columnsSections";
import FormTitles from "./formSections";
import { useSectionActions, useSectionState } from "./providersSections";

export default function TableSections() {
  const { loading, data, showForm } = useSectionState();
  const { setData, setShowForm, remove, handleShowFormForUpdate } =
    useSectionActions();
  return (
    <div className="relative w-full h-full">
      <TableData<SectionType>
        filter="title"
        loading={loading}
        datas={data}
        setData={setData}
        showForm={showForm}
        setShowForm={setShowForm}
        remove={remove}
        columnsData={columnsSections({ handleShowFormForUpdate })}
      />

      <FormTitles />
    </div>
  );
}
