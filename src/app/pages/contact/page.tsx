"use client";
import { ContactForm } from "@/app/components/pages/contact/contactForm";
import { Hero } from "@/app/components/pages/hero";
import { useAvatar } from "@/app/dashboard/avatar/useAvatar";
import { useSections } from "@/app/dashboard/sections/useSections";

export default function Contact() {
  const { datas: avatars } = useAvatar();
  const avatar = avatars.find((avatar) => avatar.page === "contact") || null;
  const { datas: sectionsHero } = useSections();
  const section =
    sectionsHero.find((section) => section.section === "contact") || null;

  return (
    <>
      <Hero avatar={avatar} section={section} />
      <ContactForm />
    </>
  );
}
