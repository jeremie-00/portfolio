import { handleResponseToast } from "@/app/components/toast";
import { Result } from "@/app/types/globalType";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { StoreApi, UseBoundStore } from "zustand";

interface CrudOptions<T> {
  store: UseBoundStore<
    StoreApi<{
      datas: T[];
      setDatasStore: (data: T[]) => void;
      addStore: (item: T) => void;
      updateStore: (
        predicate: (item: T) => boolean,
        updates: Partial<T>
      ) => void;
      removeStore: (predicate: (item: T) => boolean) => void;
    }>
  >;
  queryKey: string;
  fetchFn: () => Promise<T[]>;
  createFn: (formData: FormData) => Promise<Result<T>>;
  updateFn: (formData: FormData) => Promise<Result<T>>;
  deleteFn: ({ id }: { id: string }) => Promise<Result<T>>;
}

export const useCrud = <T extends { id: string }>({
  store,
  queryKey,
  fetchFn,
  createFn,
  updateFn,
  deleteFn,
}: CrudOptions<T>) => {
  const queryClient = useQueryClient();

  const { datas, setDatasStore, addStore, updateStore, removeStore } = store();

  const fetchQuery = useQuery([queryKey], fetchFn, {
    staleTime: 60_000,
    onSuccess: (fetchedDatas) => setDatasStore(fetchedDatas || []),
  });

  const mutateAdd = useMutation({
    mutationFn: createFn,
    onSuccess: (res) => {
      if (res?.data?.success) {
        addStore(res.data.state);
        queryClient.invalidateQueries([queryKey]);
      }
      handleResponseToast(res);
    },
  });

  const mutateUpdate = useMutation({
    mutationFn: updateFn,
    onSuccess: (res) => {
      if (res?.data?.success) {
        updateStore((data) => data.id === res.data.state.id, res.data.state);
        queryClient.invalidateQueries([queryKey]);
      }
      handleResponseToast(res);
    },
  });

  const mutateRemove = useMutation({
    mutationFn: deleteFn,
    onSuccess: (res) => {
      if (res.data.success) {
        removeStore((data) => data.id === res.data.state.id);
        queryClient.invalidateQueries([queryKey]);
        if (mutateRemove.isSuccess) {
          mutateRemove.reset();
        }
      }
      handleResponseToast(res);
    },
  });

  return {
    datas,
    addStore,
    updateStore,
    fetchQuery,
    mutateAdd,
    mutateUpdate,
    mutateRemove,
  };
};
