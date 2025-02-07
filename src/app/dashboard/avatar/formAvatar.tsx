"use client";
import { Button } from "@/app/components/buttons/buttons";
import { BtnSubmit } from "@/app/components/buttons/submit";
import { ImageManager } from "@/app/components/imageManager";
import { handleResponseToast } from "@/app/components/toast";
import Form from "next/form";
import React from "react";
import { useAvatarActions, useAvatarState } from "./providersAvatar";

export function FormAvatar() {
  const { showForm, updated, selectedId, formData, pages } = useAvatarState();
  const {
    setShowForm,
    setUpdated,
    setSelectedId,
    setFormData,
    refetch,
    create,
    update,
  } = useAvatarActions();

  const [imagePreviewRecto, setImagePreviewRecto] = React.useState<
    string | null
  >(null);
  const [imagePreviewVerso, setImagePreviewVerso] = React.useState<
    string | null
  >(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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
      page: "",
      text: "",
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
    });
    setSelectedId("");
    setImagePreviewRecto(null);
    setImagePreviewVerso(null);
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

  const optionPosition = [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
    "middleTopLeft",
    "middleTopRight",
    "middleBottomLeft",
    "middleBottomRight",
  ];

  return (
    showForm && (
      <div className="modal lg:px-40">
        <Form
          action={handleSubmit}
          className="w-full h-fit flex flex-col bg-section gap-12 p-6 shadow-custom rounded-xl"
        >
          <h2 className="h2-form">Avatar</h2>
          <input type="hidden" name="id" defaultValue={selectedId} />

          <input
            type="hidden"
            name="idImageRecto"
            defaultValue={imagePreviewRecto ? "" : formData.recto?.id}
          />
          <input
            type="hidden"
            name="urlImageRecto"
            defaultValue={formData.recto?.url}
          />
          <ImageManager
            name="recto"
            url={formData?.recto?.url || ""}
            imagePreview={imagePreviewRecto}
            setImagePreview={setImagePreviewRecto}
          />
          <input
            type="hidden"
            name="idImageVerso"
            defaultValue={imagePreviewVerso ? "" : formData.verso?.id}
          />
          <input
            type="hidden"
            name="urlImageVerso"
            defaultValue={formData.verso?.url}
          />
          <ImageManager
            name="verso"
            url={formData?.verso?.url || ""}
            imagePreview={imagePreviewVerso}
            setImagePreview={setImagePreviewVerso}
          />

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

          <label htmlFor="arrowBullPosition" className="label-form">
            Position de la fleche de la bulle
            <select
              name="arrowBullPosition"
              id="arrowBullPosition"
              value={formData.arrowBullPosition}
              onChange={handleChange}
            >
              {optionPosition.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
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
