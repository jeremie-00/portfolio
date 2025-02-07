"use client";
import { Button } from "@/app/components/buttons/buttons";
import { BtnSubmit } from "@/app/components/buttons/submit";
import { handleResponseToast } from "@/app/components/toast";
import Form from "next/form";
import React from "react";
import {
  useNavigationActions,
  useNavigationState,
} from "./providersNavigation";

export default function FormNavigation() {
  const { showForm, updated, selectedId, formData, lengthLinks } =
    useNavigationState();
  const {
    setShowForm,
    setUpdated,
    setSelectedId,
    setFormData,
    setLengthLinks,
    refetch,
    create,
    update,
  } = useNavigationActions();

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
      href: "",
      title: "",
      page: "",
      order: 0,
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
        setLengthLinks(lengthLinks + 1);
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
          <h2 className="h2-form">Lien de navigation</h2>
          <input type="hidden" name="id" value={selectedId} />

          <label htmlFor="order" className="label-form">
            Ordre
            <input
              type="number"
              name="order"
              id="order"
              placeholder="Enter order"
              value={formData.order ? formData.order : lengthLinks}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="page" className="label-form">
            Page
            <input
              type="page"
              name="page"
              id="page"
              placeholder="Enter page"
              value={formData.page || ""}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="title" className="label-form">
            Titre
            <input
              type="title"
              name="title"
              id="title"
              placeholder="Enter title"
              value={formData.title || ""}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="href" className="label-form">
            Href
            <input
              type="href"
              name="href"
              id="href"
              placeholder="Enter href"
              value={formData.href || ""}
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
