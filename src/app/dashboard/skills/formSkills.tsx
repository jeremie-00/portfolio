"use client";
import { Button } from "@/app/components/buttons/buttons";
import { BtnSubmit } from "@/app/components/buttons/submit";
import { ImageManager } from "@/app/components/imageManager";
import { handleResponseToast } from "@/app/components/toast";
import {
  useSkillActions,
  useSkillState,
} from "@/app/dashboard/skills/providersSkills";
import Form from "next/form";
import React from "react";

export function FormSkills() {
  const { showForm, updated, selectedId, formData } = useSkillState();
  const {
    setShowForm,
    setUpdated,
    setSelectedId,
    setFormData,
    refetch,
    create,
    update,
  } = useSkillActions();

  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      title: "",
      image: {
        id: "",
        url: "",
        alt: "",
        skillId: "",
        aboutId: null,
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
          <h2 className="h2-form">Skills</h2>
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

          <label htmlFor="title" className="label-form">
            Titre
            <input
              type="title"
              name="title"
              id="title"
              placeholder="Enter skill title"
              value={formData.title ? formData.title : ""}
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
