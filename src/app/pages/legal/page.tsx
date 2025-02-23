import { Container, Content } from "@/app/components/containers";

const textLegal = [
  {
    title: "Propriétaire du site",
    details: [
      { label: "Nom", value: "Jérémie Hérault" },
      { label: "Adresse", value: "Neuilly-en-Thelle, France" },
      { label: "Email", value: "jherault@gmail.com" },
    ],
  },
  {
    title: "Hébergeur",
    details: [
      { label: "Nom", value: "Vercel Inc." },
      {
        label: "Adresse",
        value: "340 S Lemon Ave #4133, Walnut, CA 91789, USA",
      },
    ],
  },
  {
    title: "Protection des données",
    content:
      "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez de droits d'accès, de modification, de suppression ou de portabilité de vos données personnelles. Pour exercer ces droits, veuillez me contacter à l'adresse email mentionnée ci-dessus.",
  },
  {
    title: "Cookies",
    content:
      "Ce site utilise des cookies pour améliorer votre expérience utilisateur. Vous pouvez paramétrer votre navigateur pour refuser les cookies ou être informé lorsqu'un cookie est enregistré. En continuant à utiliser ce site, vous acceptez l'utilisation des cookies conformément à notre politique.",
  },
  {
    title: "Liens hypertextes",
    content:
      "Ce site peut contenir des liens vers des sites externes. Je ne suis pas responsable du contenu, des pratiques ou des politiques de ces sites tiers. L'inclusion de liens ne constitue pas une approbation ou une garantie.",
  },
  {
    title: "Propriété intellectuelle",
    content:
      "Tous les éléments de ce site (textes, images, logos, graphismes, etc.) sont protégés par les lois relatives à la propriété intellectuelle. Toute reproduction, modification ou distribution est strictement interdite sans autorisation préalable.",
  },
  {
    title: "Conditions d'utilisation",
    content:
      "L'accès et l'utilisation de ce site impliquent l'acceptation pleine et entière des présentes mentions légales et des lois applicables. Toute utilisation frauduleuse ou non autorisée du site sera passible de poursuites.",
  },
  {
    title: "Contact",
    content:
      "Pour toute demande d'information, vous pouvez me contacter via le formulaire disponible sur le site ou directement par email.",
  },
  {
    title: "Crédits",
    details: [
      { label: "Conception et développement", value: "Jérémie Hérault" },
    ],
  },
  {
    title: "Avertissement général",
    content:
      "Les informations fournies sur ce site sont à titre indicatif et peuvent être modifiées sans préavis. Bien que tous les efforts soient faits pour garantir l'exactitude des informations, aucune responsabilité ne sera engagée en cas d'erreur ou d'omission.",
  },
];

interface LegalSectionProps {
  title: string;
  details?: { label: string; value: string }[];
  content?: string;
}

const LegalSection: React.FC<LegalSectionProps> = ({
  title,
  details,
  content,
}) => {
  return (
    <article>
      <h2 className="h2-legal">{title}</h2>
      {details ? (
        details.map((item, index) => (
          <p key={index}>
            <strong>{item.label} :</strong> {item.value}
          </p>
        ))
      ) : (
        <p>{content}</p>
      )}
    </article>
  );
};

export default function LegalPage() {
  return (
    <>
      <Container>
        <Content>
          <section className="section bg-linear-custom flex flex-col items-start justify-center gap-12">
            <h1 className="h1">Mentions Légales</h1>

            {textLegal.map((section, index) => (
              <LegalSection
                key={index}
                title={section.title}
                details={section.details}
                content={section.content}
              />
            ))}
          </section>
        </Content>
      </Container>
    </>
  );
}
