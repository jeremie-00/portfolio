"use client";
import { getNavLinks } from "@/app/services/navigation.actions";
import {
  createTextNotation,
  deleteTextNotation,
  getTextNotation,
  updateTextNotation,
} from "@/app/services/textNotation.actions";
import { Result } from "@/app/types/globalType";
import { NotationType } from "@/app/types/prismaType";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type NotationContextType = {
  state: {
    loading: boolean;
    data: NotationType[];
    showForm: boolean;
    updated: boolean;
    selectedId: string;
    formData: NotationType;
    lengthTexts: number;
    pages: string[];
  };
  actions: {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setData: Dispatch<SetStateAction<NotationType[]>>;
    setShowForm: Dispatch<SetStateAction<boolean>>;
    setUpdated: Dispatch<SetStateAction<boolean>>;
    setSelectedId: Dispatch<SetStateAction<string>>;
    setFormData: Dispatch<SetStateAction<NotationType>>;
    setLengthTexts: Dispatch<SetStateAction<number>>;
    setPages: Dispatch<SetStateAction<string[]>>;
    handleShowFormForUpdate: (id: string) => void;
    refetch: () => void;
    create: (formData: FormData) => Promise<Result>;
    update: (formData: FormData) => Promise<Result>;
    remove: ({ id }: { id: string }) => Promise<Result>;
  };
};

export const NotationContext = createContext<NotationContextType | undefined>(
  undefined
);

export const useNotationContext = () => {
  const context = useContext(NotationContext);
  if (!context) {
    throw new Error(
      "useNotationContext must be used within a NotationProvider"
    );
  }
  return context;
};

export const useNotationState = () => {
  const { state } = useNotationContext();
  return state;
};

export const useNotationActions = () => {
  const { actions } = useNotationContext();
  return actions;
};

export const NotationProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NotationType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [lengthTexts, setLengthTexts] = useState(0);
  const [pages, setPages] = useState<string[]>([]);

  const initialFormData: NotationType = {
    id: "",
    page: "",
    order: 0,
    type: "",
    textNotation: "",
    text: "",
  };
  const [formData, setFormData] = useState<NotationType>(initialFormData);

  const handleShowFormForUpdate = (id: string) => {
    setUpdated(true);
    setSelectedId(id);
    const textsData = data.find((text) => text.id === id);
    if (textsData && formData.id !== textsData.id) {
      setFormData(textsData);
      setShowForm(!showForm);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const texts = await getTextNotation();
      setData(texts);
      setLengthTexts(texts.length + 1);
    } catch (error) {
      console.error("Error fetching TextsNotation:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchPages = async () => {
    try {
      setLoading(true);
      const links = await getNavLinks();
      const pagesList = links.map((link) => link.page);
      setPages(pagesList);
    } catch (error) {
      console.error("Error fetching Pages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPages();
  }, []);

  const contextData: NotationContextType = {
    state: {
      loading,
      data,
      showForm,
      updated,
      selectedId,
      formData,
      lengthTexts,
      pages,
    },
    actions: {
      setLoading,
      setData,
      setShowForm,
      setUpdated,
      setSelectedId,
      setFormData,
      setLengthTexts,
      setPages,
      handleShowFormForUpdate,
      refetch: fetchData,
      create: createTextNotation,
      update: updateTextNotation,
      remove: deleteTextNotation,
    },
  };

  return (
    <NotationContext.Provider value={contextData}>
      {children}
    </NotationContext.Provider>
  );
};
