"use client";
import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "@/app/services/skills.actions";
import { Result } from "@/app/types/globalType";
import { FullSkill } from "@/app/types/prismaType";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type SkillContextType = {
  state: {
    loading: boolean;
    data: FullSkill[];
    showForm: boolean;
    updated: boolean;
    selectedId: string;
    formData: FullSkill;
  };
  actions: {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setData: Dispatch<SetStateAction<FullSkill[]>>;
    setShowForm: Dispatch<SetStateAction<boolean>>;
    setUpdated: Dispatch<SetStateAction<boolean>>;
    setSelectedId: Dispatch<SetStateAction<string>>;
    setFormData: Dispatch<SetStateAction<FullSkill>>;
    handleShowFormForUpdate: (id: string) => void;
    refetch: () => void;
    create: (formData: FormData) => Promise<Result>;
    update: (formData: FormData) => Promise<Result>;
    remove: ({ id }: { id: string }) => Promise<Result>;
  };
};

export const SkillContext = createContext<SkillContextType | undefined>(
  undefined
);

export const useSkillContext = () => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error("useSkillContext must be used within a SkillProvider");
  }
  return context;
};

export const useSkillState = () => {
  const { state } = useSkillContext();
  return state;
};

export const useSkillActions = () => {
  const { actions } = useSkillContext();
  return actions;
};

export const SkillProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FullSkill[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const initialFormData: FullSkill = {
    id: "",
    title: "",
    image: { id: "", url: "", alt: "", skillId: "" },
  };
  const [formData, setFormData] = useState<FullSkill>(initialFormData);

  const handleShowFormForUpdate = (id: string) => {
    setUpdated(true);
    setSelectedId(id);
    const skillsData = data.find((text) => text.id === id);
    if (skillsData && formData.id !== skillsData.id) {
      setFormData(skillsData);
      setShowForm(!showForm);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const skills = await getSkills();
      setData(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contextData: SkillContextType = {
    state: { loading, data, showForm, updated, selectedId, formData },
    actions: {
      setLoading,
      setData,
      setShowForm,
      setUpdated,
      setSelectedId,
      setFormData,
      handleShowFormForUpdate,
      refetch: fetchData,
      create: createSkill,
      update: updateSkill,
      remove: deleteSkill,
    },
  };

  return (
    <SkillContext.Provider value={contextData}>
      {children}
    </SkillContext.Provider>
  );
};
