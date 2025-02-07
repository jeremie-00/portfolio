"use client";

import { NotationType } from "@/app/types/prismaType";
import { TableData } from "../../components/tableData";

import { columnsNotation } from "./columnsNotation";
import FormNotations from "./formNotations";
import { useNotationActions, useNotationState } from "./providersNotation";

export default function TableNotation() {
  const { loading, data, showForm, lengthTexts } = useNotationState();
  const {
    setData,
    setShowForm,
    setLengthTexts,
    remove,
    handleShowFormForUpdate,
  } = useNotationActions();
  return (
    <section className="relative w-full h-full">
      <h2 className="h2">Texte avec notation</h2>
      <TableData<NotationType>
        filter="order"
        loading={loading}
        datas={data}
        setData={setData}
        showForm={showForm}
        setShowForm={setShowForm}
        lengthData={lengthTexts}
        setLengthData={setLengthTexts}
        remove={remove}
        columnsData={columnsNotation({ handleShowFormForUpdate })}
      />

      <FormNotations />
    </section>
  );
}
