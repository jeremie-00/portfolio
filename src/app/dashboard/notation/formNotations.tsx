import { Button } from "@/app/components/buttons/buttons";
import { BtnSubmit } from "@/app/components/buttons/submit";
import { handleResponseToast } from "@/app/components/toast";
import Form from "next/form";
import React from "react";
import { useNotationActions, useNotationState } from "./providersNotation";

export default function FormNotations() {
  const { showForm, updated, selectedId, formData, lengthTexts, pages } =
    useNotationState();
  const {
    setShowForm,
    setUpdated,
    setSelectedId,
    setFormData,
    setLengthTexts,
    refetch,
    create,
    update,
  } = useNotationActions();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      page: "",
      order: 0,
      type: "",
      textNotation: "",
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
      } else {
        setLengthTexts(lengthTexts + 1);
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
          <h2 className="h2-form">Texte avec Notation</h2>
          <input type="hidden" name="id" value={selectedId} />
          <label htmlFor="page" className="label-form">
            Sélectioner la page
            <select
              name="page"
              id="page"
              value={formData.page}
              onChange={handleChange}
            >
              {pages.map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="type" className="label-form">
            Sélection du type de notation
            <select
              name="type"
              id="type"
              value={formData.type || ""}
              onChange={handleChange}
            >
              <option value="underline">Underline</option>
              <option value="highlight">Highlight</option>
              <option value="box">Box</option>
              <option value="circle">Circle</option>
            </select>
          </label>

          <label htmlFor="order" className="label-form">
            Ordre
            <input
              type="number"
              name="order"
              id="order"
              placeholder="Enter order"
              value={formData.order ? formData.order : lengthTexts}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="textNotation" className="label-form">
            Texte Notation
            <input
              type="textNotation"
              name="textNotation"
              id="textNotation"
              placeholder="Enter text notation"
              value={formData.textNotation || ""}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="text" className="label-form">
            Texte
            <input
              type="text"
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
