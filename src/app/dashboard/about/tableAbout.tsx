"use client";

import { FullAbout } from "@/app/types/prismaType";
import { TableData } from "../../components/tableData";

import { columnsAbout } from "./columnsAbout";
import { FormAbout } from "./formAbout";
import { useAboutActions, useAboutState } from "./providersAbout";

export default function TableAbout() {
  const { loading, data, showForm, lengthAbout } = useAboutState();
  const {
    setData,
    setShowForm,
    setLengthAbout,
    remove,
    handleShowFormForUpdate,
  } = useAboutActions();
  return (
    <section className="relative w-full h-full">
      <h2 className="h2">A propos</h2>
      <TableData<FullAbout>
        filter="text"
        loading={loading}
        datas={data}
        setData={setData}
        showForm={showForm}
        setShowForm={setShowForm}
        lengthData={lengthAbout}
        setLengthData={setLengthAbout}
        remove={remove}
        columnsData={columnsAbout({ handleShowFormForUpdate })}
      />

      <FormAbout />
    </section>
  );
}
