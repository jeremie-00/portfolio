"use client";

import { FullLink } from "@/app/types/prismaType";
import { TableData } from "../../components/tableData";

import { columnsNavigation } from "./columnsNavigation";
import FormNavigation from "./formNavigation";
import {
  useNavigationState,
  useNavigationActions,
} from "./providersNavigation";

export default function TableNavigation() {
  const { loading, data, showForm, lengthLinks } = useNavigationState();
  const {
    setData,
    setShowForm,
    setLengthLinks,
    remove,
    handleShowFormForUpdate,
  } = useNavigationActions();
  return (
    <section className="relative w-full h-full">
      <h2 className="h2">Liens</h2>
      <TableData<FullLink>
        filter="order"
        loading={loading}
        datas={data}
        setData={setData}
        showForm={showForm}
        setShowForm={setShowForm}
        lengthData={lengthLinks}
        setLengthData={setLengthLinks}
        remove={remove}
        columnsData={columnsNavigation({ handleShowFormForUpdate })}
      />

      <FormNavigation />
    </section>
  );
}
