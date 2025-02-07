"use client";
import {
  createAvatar,
  deleteAvatar,
  getAvatar,
  updateAvatar,
} from "@/app/services/avatar.actions";
import { getNavLinks } from "@/app/services/navigation.actions";
import { Result } from "@/app/types/globalType";
import { FullAvatar } from "@/app/types/prismaType";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type AvatarContextType = {
  state: {
    loading: boolean;
    data: FullAvatar[];
    showForm: boolean;
    updated: boolean;
    selectedId: string;
    formData: FullAvatar;
    pages: string[];
  };
  actions: {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setData: Dispatch<SetStateAction<FullAvatar[]>>;
    setShowForm: Dispatch<SetStateAction<boolean>>;
    setUpdated: Dispatch<SetStateAction<boolean>>;
    setSelectedId: Dispatch<SetStateAction<string>>;
    setFormData: Dispatch<SetStateAction<FullAvatar>>;
    setPages: Dispatch<SetStateAction<string[]>>;
    handleShowFormForUpdate: (id: string) => void;
    refetch: () => void;
    create: (formData: FormData) => Promise<Result>;
    update: (formData: FormData) => Promise<Result>;
    remove: ({ id }: { id: string }) => Promise<Result>;
  };
};

export const AvatarContext = createContext<AvatarContextType | undefined>(
  undefined
);

export const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAboutContext must be used within a AboutProvider");
  }
  return context;
};

export const useAvatarState = () => {
  const { state } = useAvatarContext();
  return state;
};

export const useAvatarActions = () => {
  const { actions } = useAvatarContext();
  return actions;
};

export const AvatarProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FullAvatar[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [pages, setPages] = useState<string[]>([]);

  const initialFormData: FullAvatar = {
    id: "",
    text: "",
    page: "",
    arrowBullPosition: "middleTopLeft",
    recto: {
      id: "",
      url: "",
      alt: "",
      skillId: null,
      aboutId: null,
      avatarRectoId: "",
      avatarVersoId: "",
    },
    verso: {
      id: "",
      url: "",
      alt: "",
      skillId: null,
      aboutId: null,
      avatarRectoId: "",
      avatarVersoId: "",
    },
  };
  const [formData, setFormData] = useState<FullAvatar>(initialFormData);

  const handleShowFormForUpdate = (id: string) => {
    setUpdated(true);
    setSelectedId(id);
    const avatarsData = data.find((text) => text.id === id);
    if (avatarsData && formData.id !== avatarsData.id) {
      setFormData(avatarsData);
      setShowForm(!showForm);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const avatars = await getAvatar();

      setData(avatars);
    } catch (error) {
      console.error("Error fetching avatars:", error);
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

  const contextData: AvatarContextType = {
    state: { loading, data, showForm, updated, selectedId, formData, pages },
    actions: {
      setLoading,
      setData,
      setShowForm,
      setUpdated,
      setSelectedId,
      setFormData,
      setPages,
      handleShowFormForUpdate,
      refetch: fetchData,
      create: createAvatar,
      update: updateAvatar,
      remove: deleteAvatar,
    },
  };

  return (
    <AvatarContext.Provider value={contextData}>
      {children}
    </AvatarContext.Provider>
  );
};
