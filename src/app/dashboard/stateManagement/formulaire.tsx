"use client";
import { Button } from "@/app/components/buttons/buttons";
import { BtnSubmit } from "@/app/components/buttons/submit";
import { Result } from "@/app/types/globalType";
import { Option } from "@/components/ui/multiple-selector";
import Form from "next/form";
import { ReactNode } from "react";
import { UseMutationResult } from "react-query";
import { useLinks } from "../link/useLinks";
import { useFormulaire } from "./formulaireContext";

interface FormulaireProps<T> {
  mutateAdd: UseMutationResult<Result<T>, unknown, FormData, unknown>;
  mutateUpdate: UseMutationResult<Result<T>, unknown, FormData, unknown>;
  children: ReactNode;
}

const filteredLinks = (formData: FormData) => {
  const linksLength = formData.getAll("links.url").length;
  const links = Array.from({ length: linksLength }).map((_, index) => ({
    id: String(formData.getAll("links.id")[index] || ""),
    href: String(formData.getAll("links.url")[index] || ""),
    title: String(formData.getAll("links.title")[index] || ""),
  }));
  const linksFiltered = links.filter((link) => link.href !== ""); // Filtrer les liens vides
  return linksFiltered;
};

const formatProjetData = (formData: FormData, selectedSkills: Option[]) => {
  const linksFiltered = filteredLinks(formData);
  // Ajouter les liens au FormData sous format JSON
  formData.set("links", JSON.stringify(linksFiltered));
  console.log(linksFiltered);
  // Ajouter les compétences sous forme d'IDs
  selectedSkills.forEach((skill) =>
    formData.append("skills", String(skill.id))
  );

  return formData;
};

export default function Formulaire<T>({
  mutateAdd,
  mutateUpdate,
  children,
}: FormulaireProps<T>) {
  const { formState, setFormState, selectedSkills, closeFormulaire } =
    useFormulaire();

  const { datas, addStore, updateStore } = useLinks();

  const handleDataMutation = (newForm: FormData, isUpdate: boolean) => {
    if (isUpdate) {
      mutateUpdate.mutate(newForm);
      handleQuitter();
    } else {
      mutateAdd.mutate(newForm);
    }
    if (formState.isProjet) {
      const linksFiltered = filteredLinks(newForm);
      linksFiltered.forEach((link, index) => {
        const fullLink = {
          ...link,
          page: `projet-${newForm.get("title")}-${index}`,
          order: index + 1,
          inNav: false,
          projetId: null,
        };
        const existingData = datas.some((data) => data.id === fullLink.id);
        if (existingData) {
          updateStore((data) => data.id === fullLink.id, fullLink);
        } else {
          addStore(fullLink);
        }
      });
    }
  };

  const handleSubmit = (newForm: FormData) => {
    // Formatter les données avant envoi
    const formattedData = formState.isProjet
      ? formatProjetData(newForm, selectedSkills)
      : newForm;

    for (const [key, value] of formattedData.entries()) {
      console.log(`${key}:`, value);
    }

    handleDataMutation(formattedData, formState.isUpdate);
    if (!formState.isUpdate)
      setFormState((prev) => ({ ...prev, isReset: true }));
  };

  const handleQuitter = () => {
    closeFormulaire();
  };

  return (
    formState.isOpen && (
      <div className="modal lg:px-40">
        <Form
          action={handleSubmit}
          className="w-full h-fit flex flex-col bg-section gap-12 p-6 shadow-custom rounded-xl"
        >
          {children}
          <div className="flex items-center justify-between ">
            <Button theme="outline" size="sm" onClick={handleQuitter}>
              Quitter
            </Button>
            <BtnSubmit />
          </div>
        </Form>
      </div>
    )
  );
}
