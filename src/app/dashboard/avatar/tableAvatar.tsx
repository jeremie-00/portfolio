"use client";

import { FullAvatar } from "@/app/types/prismaType";
import { TableData } from "../tableData";

import { columnsAvatar } from "./columnsAvatar";
import { FormAvatar } from "./formAvatar";
import { useAvatarActions, useAvatarState } from "./providersAvatar";

export default function TableAvatar() {
  const { loading, data, showForm } = useAvatarState();
  const { setData, setShowForm, remove, handleShowFormForUpdate } =
    useAvatarActions();
  return (
    <section className="relative w-full h-full">
      <h2 className="h2">Avatar</h2>
      <TableData<FullAvatar>
        filter="text"
        loading={loading}
        datas={data}
        setData={setData}
        showForm={showForm}
        setShowForm={setShowForm}
        remove={remove}
        columnsData={columnsAvatar({ handleShowFormForUpdate })}
      />

      <FormAvatar />
    </section>
  );
}
