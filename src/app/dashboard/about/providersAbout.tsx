"use client";
import {
  createAbout,
  deleteAbout,
  getAbout,
  updateAbout,
} from "@/app/services/about.actions";
import { Result } from "@/app/types/globalType";
import { FullAbout } from "@/app/types/prismaType";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type AboutContextType = {
  state: {
    loading: boolean;
    data: FullAbout[];
    showForm: boolean;
    updated: boolean;
    selectedId: string;
    formData: FullAbout;
    lengthAbout: number;
  };
  actions: {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setData: Dispatch<SetStateAction<FullAbout[]>>;
    setShowForm: Dispatch<SetStateAction<boolean>>;
    setUpdated: Dispatch<SetStateAction<boolean>>;
    setSelectedId: Dispatch<SetStateAction<string>>;
    setFormData: Dispatch<SetStateAction<FullAbout>>;
    setLengthAbout: Dispatch<SetStateAction<number>>;
    handleShowFormForUpdate: (id: string) => void;
    refetch: () => void;
    create: (formData: FormData) => Promise<Result>;
    update: (formData: FormData) => Promise<Result>;
    remove: ({ id }: { id: string }) => Promise<Result>;
  };
};

export const AboutContext = createContext<AboutContextType | undefined>(
  undefined
);

export const useAboutContext = () => {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error("useAboutContext must be used within a AboutProvider");
  }
  return context;
};

export const useAboutState = () => {
  const { state } = useAboutContext();
  return state;
};

export const useAboutActions = () => {
  const { actions } = useAboutContext();
  return actions;
};

export const AboutProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FullAbout[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [lengthAbout, setLengthAbout] = useState(0);

  const initialFormData: FullAbout = {
    id: "",
    text: "",
    order: 0,
    image: {
      id: "",
      url: "",
      alt: "",
      aboutId: "",
      skillId: null,
      avatarRectoId: null,
      avatarVersoId: null,
    },
  };
  const [formData, setFormData] = useState<FullAbout>(initialFormData);

  const handleShowFormForUpdate = (id: string) => {
    setUpdated(true);
    setSelectedId(id);
    const aboutsData = data.find((text) => text.id === id);
    if (aboutsData && formData.id !== aboutsData.id) {
      setFormData(aboutsData);
      setShowForm(!showForm);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const abouts = await getAbout();
      setData(abouts);
      setLengthAbout(abouts.length + 1);
    } catch (error) {
      console.error("Error fetching abouts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contextData: AboutContextType = {
    state: {
      loading,
      data,
      showForm,
      updated,
      selectedId,
      formData,
      lengthAbout,
    },
    actions: {
      setLoading,
      setData,
      setShowForm,
      setUpdated,
      setSelectedId,
      setFormData,
      setLengthAbout,
      handleShowFormForUpdate,
      refetch: fetchData,
      create: createAbout,
      update: updateAbout,
      remove: deleteAbout,
    },
  };

  return (
    <AboutContext.Provider value={contextData}>
      {children}
    </AboutContext.Provider>
  );
};
