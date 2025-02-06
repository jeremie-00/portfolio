"use client";

import { NotationType } from "@/app/types/prismaType";
import { TableData } from "../tableData";

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
    <div className="relative w-full h-full">
      <TableData<NotationType>
        filter="order"
        loading={loading}
        datas={data}
        setData={setData}
        showForm={showForm}
        setShowForm={setShowForm}
        lengthTexts={lengthTexts}
        setLengthTexts={setLengthTexts}
        remove={remove}
        columnsData={columnsNotation({ handleShowFormForUpdate })}
      />

      <FormNotations />
    </div>
  );
}
