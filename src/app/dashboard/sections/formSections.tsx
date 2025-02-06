"use client";
import { Button } from "@/app/components/buttons/buttons";
import { BtnSubmit } from "@/app/components/buttons/submit";
import { handleResponseToast } from "@/app/components/toast";
import Form from "next/form";
import React from "react";
import { useSectionActions, useSectionState } from "./providersSections";

export default function FormTitles() {
  const { showForm, updated, selectedId, formData, sectionsName } =
    useSectionState();
  const {
    setShowForm,
    setUpdated,
    setSelectedId,
    setFormData,
    refetch,
    create,
    update,
  } = useSectionActions();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
    handleReset();
  };

  const handleReset = () => {
    setUpdated(false);
    setFormData({
      id: "",
      section: "",
      title: "",
      text: "",
    });
    setSelectedId("");
  };

  const handleSubmit = async (formData: FormData) => {
    const response = updated ? await update(formData) : await create(formData);
    const success = handleResponseToast(response);
    if (success) {
      refetch();
      handleReset();
      if (updated) {
        handleShowForm();
      }
    }
  };

  return (
    showForm && (
      <div className="modal lg:px-40">
        <Form
          action={handleSubmit}
          className="w-full h-fit flex flex-col bg-section gap-12 p-6 shadow-custom rounded-xl"
        >
          <h2 className="h2-form">Titre section</h2>
          <input type="hidden" name="id" value={selectedId} />

          {updated ? (
            <label htmlFor="section" className="label-form">
              Sélectionner la section
              <select
                name="section"
                id="section"
                value={formData.section}
                onChange={handleChange}
              >
                {sectionsName.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label htmlFor="section" className="label-form">
              Section
              <input
                type="section"
                name="section"
                id="section"
                placeholder="Enter section"
                value={formData.section || ""}
                onChange={handleChange}
              />
            </label>
          )}

          <label htmlFor="title" className="label-form">
            Titre
            <input
              type="title"
              name="title"
              id="title"
              placeholder="Enter titre"
              value={formData.title || ""}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="text" className="label-form">
            Texte
            <textarea
              //type="text"
              name="text"
              id="text"
              placeholder="Enter text"
              value={formData.text || ""}
              onChange={handleChange}
            />
          </label>
          <div className="flex items-center justify-between p-4">
            <Button theme="outline" size="sm" onClick={handleShowForm}>
              Quitter
            </Button>
            <BtnSubmit />
          </div>
        </Form>
      </div>
    )
  );
}
