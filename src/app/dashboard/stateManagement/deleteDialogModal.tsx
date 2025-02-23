"use client";

import { Button } from "@/app/components/buttons/buttons";
import { createPortal } from "react-dom";
import { IoWarningOutline } from "react-icons/io5";
import { useDeleteModal } from "./modalContext";

export function DeleteModal() {
  const { isOpen, title, message, onConfirm, closeModal } = useDeleteModal();

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96">
        <div className="flex flex-col items-center gap-4">
          <IoWarningOutline size={50} className="text-red-500" />
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-500">{message}</p>
        </div>
        <div className="flex justify-end gap-3 mt-5">
          <Button theme="outline" size="sm" onClick={closeModal}>
            Annuler
          </Button>
          <Button
            theme="delete"
            size="sm"
            onClick={() => {
              if (onConfirm) onConfirm();
              closeModal();
            }}
          >
            Supprimer
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
