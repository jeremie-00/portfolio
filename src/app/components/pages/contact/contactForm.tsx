"use client";
import { sendEmail } from "@/app/services/contact.actions";
import { motion } from "motion/react";
import Form from "next/form";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { LuLoaderCircle } from "react-icons/lu";
import { Flip, ToastContainer } from "react-toastify";
import { Button } from "../../buttons/buttons";
import { showToast } from "../../toast";

export function ContactForm() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const BtnSubmit = () => {
    const { pending } = useFormStatus();
    const isDisabled =
      pending ||
      !formData.lastName ||
      !formData.firstName ||
      !formData.email ||
      !formData.message;

    return (
      <Button type="submit" disabled={isDisabled} theme="primary" size="sm">
        {pending ? (
          <LuLoaderCircle size={28} className="animate-spin" />
        ) : (
          "Envoyer"
        )}
      </Button>
    );
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await sendEmail(formData);

      if (response.accepted) {
        showToast(
          "success",
          "Votre e-mail a été envoyé avec succès ! 🚀 Merci de m'avoir contacté !"
        );
      } else {
        throw new Error("L'envoi de l'e-mail a échoué.");
      }
    } catch {
      showToast(
        "error",
        "Une erreur est survenue lors de l'envoi de votre e-mail ! 😔"
      );
    }
  };

  return (
    <section className="section items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center max-w-[800px] p-px overflow-hidden rounded-xl">
        <motion.div
          className="absolute flex w-[20rem] h-[150%] bg-gradient-to-l from-background via-primary to-background"
          animate={{ rotate: [0, 360] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          style={{
            top: "50%",
            transformOrigin: "top",
          }}
        />
        <Form
          action={handleSubmit}
          className="relative w-full h-full flex flex-col bg-section gap-12 p-6 shadow-custom rounded-xl"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName">Nom</label>
              <input
                className=""
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="firsName">Prénom</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email@exemple.com"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Votre message..."
              className="w-full h-40"
              onChange={handleChange}
              maxLength={500}
            />
            <span className="text-sm text-foreground/60 text-right mt-2">
              {formData.message.length}/500
            </span>
          </div>

          <div className="flex justify-end gap-4">
            <BtnSubmit />
          </div>
        </Form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </section>
  );
}
