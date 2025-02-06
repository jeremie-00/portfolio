import { IoTrash } from "react-icons/io5";
import { Button } from "./buttons";

interface deleteButtonProps {
  loading: boolean;
  selectedIds: string[];
  confirmDelete: (id: string[]) => void;
}

export function DeleteButton({
  loading,
  selectedIds,
  confirmDelete,
}: deleteButtonProps) {
  return (
    <Button
      theme="delete"
      onClick={() => confirmDelete(selectedIds)}
      disabled={loading || selectedIds.length === 0}
      ariaLabel="Supprimer"
    >
      <IoTrash size={24} />
    </Button>
  );
}

interface DialogDeleteProps {
  loading: boolean;
  handleDelete: () => Promise<void>;
  cancelDelete: () => void;
}

export function DialogDelete({
  loading,
  handleDelete,
  cancelDelete,
}: DialogDeleteProps) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="space-y-3">
          <p>Êtes-vous sûr !</p>
          <p>Cette action est irréversible.</p>
          <p>Cela supprimera définitivement les données du serveur.</p>
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            theme="delete"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Suppression..." : "Oui, Supprimer"}
          </Button>
          <Button theme="outline" size="sm" onClick={cancelDelete}>
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
}
