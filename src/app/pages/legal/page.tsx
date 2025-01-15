import { Container, Content } from "@/app/components/containers";
import { ParticlesBackground } from "@/app/components/particles";

export default function LegalPage() {
  return (
    <>
      <ParticlesBackground />
      <Container>
        <Content>
          <section className="section bg-linear-custom flex flex-col items-start justify-center gap-12">
            <h1 className="h1">Mentions Légales</h1>

            <article>
              <h2 className="text-xl font-semibold mb-2">
                Propriétaire du site
              </h2>
              <p>
                <strong>Nom :</strong> Jérémie Hérault
              </p>
              <p>
                <strong>Adresse :</strong> Neuilly-en-Thelle, France
              </p>
              <p>
                <strong>Email :</strong> jherault@gmail.com
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Hébergeur</h2>
              <p>
                <strong>Nom :</strong> Vercel Inc.
              </p>
              <p>
                <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA
                91789, USA
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">
                Protection des données
              </h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD), vous disposez de droits d&apos;accès, de modification,
                de suppression ou de portabilité de vos données personnelles.
                Pour exercer ces droits, veuillez me contacter à l&apos;adresse
                email mentionnée ci-dessus.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Cookies</h2>
              <p>
                Ce site utilise des cookies pour améliorer votre expérience
                utilisateur. Vous pouvez paramétrer votre navigateur pour
                refuser les cookies ou être informé lorsqu&apos;un cookie est
                enregistré. En continuant à utiliser ce site, vous acceptez
                l&apos;utilisation des cookies conformément à notre politique.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Liens hypertextes</h2>
              <p>
                Ce site peut contenir des liens vers des sites externes. Je ne
                suis pas responsable du contenu, des pratiques ou des politiques
                de ces sites tiers. L&apos;inclusion de liens ne constitue pas
                une approbation ou une garantie.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">
                Propriété intellectuelle
              </h2>
              <p>
                Tous les éléments de ce site (textes, images, logos, graphismes,
                etc.) sont protégés par les lois relatives à la propriété
                intellectuelle. Toute reproduction, modification ou distribution
                est strictement interdite sans autorisation préalable.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">
                Conditions d&apos;utilisation
              </h2>
              <p>
                L&apos;accès et l&apos;utilisation de ce site impliquent
                l&apos;acceptation pleine et entière des présentes mentions
                légales et des lois applicables. Toute utilisation frauduleuse
                ou non autorisée du site sera passible de poursuites.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Contact</h2>
              <p>
                Pour toute demande d&apos;information, vous pouvez me contacter
                via le formulaire disponible sur le site ou directement par
                email.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Crédits</h2>
              <p>
                <strong>Conception et développement :</strong> Jérémie Hérault
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">
                Avertissement général
              </h2>
              <p>
                Les informations fournies sur ce site sont à titre indicatif et
                peuvent être modifiées sans préavis. Bien que tous les efforts
                soient faits pour garantir l&apos;exactitude des informations,
                aucune responsabilité ne sera engagée en cas d&apos;erreur ou
                d&apos;omission.
              </p>
            </article>
          </section>
        </Content>
      </Container>
    </>
  );
}
