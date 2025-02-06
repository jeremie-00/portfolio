import { ContactForm } from "@/app/components/pages/contact/contactForm";
import { Hero } from "@/app/components/pages/hero";
import { ParticlesBackground } from "@/app/components/particles";
import { getAvatarById } from "@/app/services/avatar.actions";
import { getSectionDetails } from "@/app/services/textHero.actions";

export default async function Contact() {
  const avatar = await getAvatarById("contact");
  const section = await getSectionDetails("contact");
  return (
    <>
      <ParticlesBackground />
      {section && <Hero avatar={avatar} section={section} />}
      <ContactForm />
    </>
  );
}
