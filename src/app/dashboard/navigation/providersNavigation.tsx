"use client";
import {
  createNavigation,
  deleteNavigation,
  getNavLinks,
  updateNavigation,
} from "@/app/services/navigation.actions";
import { Result } from "@/app/types/globalType";
import { FullLink } from "@/app/types/prismaType";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type NavigationContextType = {
  state: {
    loading: boolean;
    data: FullLink[];
    showForm: boolean;
    updated: boolean;
    selectedId: string;
    formData: FullLink;
    lengthLinks: number;
    pages: string[];
  };
  actions: {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setData: Dispatch<SetStateAction<FullLink[]>>;
    setShowForm: Dispatch<SetStateAction<boolean>>;
    setUpdated: Dispatch<SetStateAction<boolean>>;
    setSelectedId: Dispatch<SetStateAction<string>>;
    setFormData: Dispatch<SetStateAction<FullLink>>;
    setLengthLinks: Dispatch<SetStateAction<number>>;
    setPages: Dispatch<SetStateAction<string[]>>;
    handleShowFormForUpdate: (id: string) => void;
    refetch: () => void;
    create: (formData: FormData) => Promise<Result>;
    update: (formData: FormData) => Promise<Result>;
    remove: ({ id }: { id: string }) => Promise<Result>;
  };
};

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNotationContext must be used within a NotationProvider"
    );
  }
  return context;
};

export const useNavigationState = () => {
  const { state } = useNavigationContext();
  return state;
};

export const useNavigationActions = () => {
  const { actions } = useNavigationContext();
  return actions;
};

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FullLink[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [lengthLinks, setLengthLinks] = useState(0);
  const [pages, setPages] = useState<string[]>([]);

  const initialFormData: FullLink = {
    id: "",
    page: "",
    order: 0,
    title: "",
    href: "",
  };
  const [formData, setFormData] = useState<FullLink>(initialFormData);

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
      const links = await getNavLinks();
      setData(links);
      setLengthLinks(links.length + 1);
    } catch (error) {
      console.error("Error fetching TextsNotation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contextData: NavigationContextType = {
    state: {
      loading,
      data,
      showForm,
      updated,
      selectedId,
      formData,
      lengthLinks,
      pages,
    },
    actions: {
      setLoading,
      setData,
      setShowForm,
      setUpdated,
      setSelectedId,
      setFormData,
      setLengthLinks,
      setPages,
      handleShowFormForUpdate,
      refetch: fetchData,
      create: createNavigation,
      update: updateNavigation,
      remove: deleteNavigation,
    },
  };

  return (
    <NavigationContext.Provider value={contextData}>
      {children}
    </NavigationContext.Provider>
  );
};
