"use client";
import {
  createSection,
  deleteSection,
  getSection,
  UpdateSection,
} from "@/app/services/textHero.actions";
import { Result } from "@/app/types/globalType";
import { SectionType } from "@/app/types/prismaType";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type SectionContextType = {
  state: {
    loading: boolean;
    data: SectionType[];
    showForm: boolean;
    updated: boolean;
    selectedId: string;
    formData: SectionType;
    sectionsName: string[];
  };
  actions: {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setData: Dispatch<SetStateAction<SectionType[]>>;
    setShowForm: Dispatch<SetStateAction<boolean>>;
    setUpdated: Dispatch<SetStateAction<boolean>>;
    setSelectedId: Dispatch<SetStateAction<string>>;
    setFormData: Dispatch<SetStateAction<SectionType>>;
    setSectionsName: Dispatch<SetStateAction<string[]>>;
    handleShowFormForUpdate: (id: string) => void;
    refetch: () => void;
    create: (formData: FormData) => Promise<Result>;
    update: (formData: FormData) => Promise<Result>;
    remove: ({ id }: { id: string }) => Promise<Result>;
  };
};

export const SectionContext = createContext<SectionContextType | undefined>(
  undefined
);

export const useSectionContext = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSectionContext must be used within a TitleProvider");
  }
  return context;
};

export const useSectionState = () => {
  const { state } = useSectionContext();
  return state;
};

export const useSectionActions = () => {
  const { actions } = useSectionContext();
  return actions;
};

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SectionType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [sectionsName, setSectionsName] = useState<string[]>([]);

  const initialFormData: SectionType = {
    id: "",
    section: "",
    title: "",
    text: "",
  };
  const [formData, setFormData] = useState<SectionType>(initialFormData);

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
      const sections = await getSection();
      setData(sections);
      const sectionsList = sections.map((section) => section.section);
      setSectionsName(sectionsList);
    } catch (error) {
      console.error("Error fetching Sections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contextData: SectionContextType = {
    state: {
      loading,
      data,
      showForm,
      updated,
      selectedId,
      formData,
      sectionsName,
    },
    actions: {
      setLoading,
      setData,
      setShowForm,
      setUpdated,
      setSelectedId,
      setFormData,
      setSectionsName,
      handleShowFormForUpdate,
      refetch: fetchData,
      create: createSection,
      update: UpdateSection,
      remove: deleteSection,
    },
  };

  return (
    <SectionContext.Provider value={contextData}>
      {children}
    </SectionContext.Provider>
  );
};
