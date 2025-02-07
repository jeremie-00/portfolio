"use client";
import { Button } from "@/app/components/buttons/buttons";
import { BtnSubmit } from "@/app/components/buttons/submit";
import { ImageManager } from "@/app/components/imageManager";
import { handleResponseToast } from "@/app/components/toast";
import Form from "next/form";
import React from "react";
import { useAboutActions, useAboutState } from "./providersAbout";

export function FormAbout() {
  const { showForm, updated, selectedId, formData, order } = useAboutState();
  const {
    setShowForm,
    setUpdated,
    setSelectedId,
    setFormData,
    setOrder,
    refetch,
    create,
    update,
  } = useAboutActions();

  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    });
    setSelectedId("");
    setImagePreview(null);
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
        setOrder(order + 1);
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
          <h2 className="h2-form">A propos</h2>
          <input type="hidden" name="id" defaultValue={selectedId} />

          <input
            type="hidden"
            name="idImage"
            defaultValue={imagePreview ? "" : formData.image?.id}
          />
          <input
            type="hidden"
            name="urlImage"
            defaultValue={formData.image?.url}
          />
          <ImageManager
            url={formData?.image?.url || ""}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />

          <label htmlFor="text" className="label-form">
            Texte
            <textarea
              name="text"
              id="text"
              placeholder="Enter text"
              value={formData.text ? formData.text : ""}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="order" className="label-form">
            Ordre
            <input
              type="number"
              name="order"
              id="order"
              placeholder="Enter order"
              value={formData.order ? formData.order : order}
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
