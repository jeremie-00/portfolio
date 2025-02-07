"use client";

import { SectionType } from "@/app/types/prismaType";
import { TableData } from "../../components/tableData";

import { columnsSections } from "./columnsSections";
import FormTitles from "./formSections";
import { useSectionActions, useSectionState } from "./providersSections";

export default function TableSections() {
  const { loading, data, showForm } = useSectionState();
  const { setData, setShowForm, remove, handleShowFormForUpdate } =
    useSectionActions();
  return (
    <section className="relative w-full h-full">
      <h2 className="h2">Titre et texte des sections</h2>
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
    </section>
  );
}
