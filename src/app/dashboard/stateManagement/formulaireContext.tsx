"use client";

import { Option } from "@/components/ui/multiple-selector";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface FormState {
  isOpen: boolean;
  isUpdate: boolean;
  idSelect: string;
  isReset: boolean;
  isProjet: boolean;
}

interface FormulaireContextProps {
  isOpen: boolean;
  isUpdate: boolean;
  idSelect: string;
  isReset: boolean;
  isProjet: boolean;
  selectedSkills: Option[];
  formState: FormState;
  setFormState: Dispatch<SetStateAction<FormState>>;
  setSelectedSkills: Dispatch<SetStateAction<Option[]>>;
  setIsReset: Dispatch<SetStateAction<boolean>>;
  setIsProjet: Dispatch<SetStateAction<boolean>>;
  openFormulaire: (id?: string) => void;
  closeFormulaire: () => void;
}

const FormulaireContext = createContext<FormulaireContextProps | undefined>(
  undefined
);

export function FormulaireProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formState, setFormState] = useState({
    isOpen: false,
    isUpdate: false,
    idSelect: "",
    isReset: false,
    isProjet: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idSelect, setIdSelect] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);
  const [isProjet, setIsProjet] = useState(false);

  const openFormulaire = (id?: string) => {
    if (id) {
      setIsUpdate(true);
      setIdSelect(id);
    }
    setIsOpen(true);
    setFormState((prev) => ({
      ...prev,
      isOpen: true,
      isUpdate: Boolean(id),
      idSelect: id || "",
    }));
  };

  const closeFormulaire = () => {
    setIsOpen(false);
    setIsUpdate(false);
    setIdSelect("");
    setIsReset(false);
    setIsProjet(false);
    setSelectedSkills([]);
    setFormState({
      isOpen: false,
      isUpdate: false,
      idSelect: "",
      isReset: false,
      isProjet: false,
    });
  };

  return (
    <FormulaireContext.Provider
      value={{
        isOpen,
        isUpdate,
        idSelect,
        isReset,
        isProjet,
        selectedSkills,
        formState,
        setFormState,
        setSelectedSkills,
        setIsReset,
        setIsProjet,
        openFormulaire,
        closeFormulaire,
      }}
    >
      {children}
    </FormulaireContext.Provider>
  );
}

export function useFormulaire() {
  const context = useContext(FormulaireContext);
  if (!context) {
    throw new Error("useFormulaire must be used within a FormulaireProvider");
  }
  return context;
}
