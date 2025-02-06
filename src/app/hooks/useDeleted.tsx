import { useState } from "react";

export default function useDeleted() {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string[] | null>(null);

  /* Fonction pour confirmer la suppression */
  const confirmDelete = (id: string[]) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  /* Fonction pour annuler la suppression */
  const cancelDelete = () => {
    setShowDialog(false);
    setDeleteId(null);
  };

  return {
    loadingDelete,
    setLoadingDelete,
    showDialog,
    deleteId,
    setShowDialog,
    setDeleteId,
    confirmDelete,
    cancelDelete,
  };
}
