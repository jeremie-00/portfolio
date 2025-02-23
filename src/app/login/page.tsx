"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoLogoGithub } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";
import { Button } from "../components/buttons/buttons";
import { ParticlesBackground } from "../components/particles";

export default function Login() {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch {
      setErrorMessage("Échec de la connexion. Veuillez réessayer.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      setLoading(true);
      router.replace("/dashboard");
    }
  }, [session, router]);

  return (
    <>
      <ParticlesBackground />
      <section className="section flex-col items-center justify-center">
        <h1 className="h1">Login</h1>

        {errorMessage && <p className="error">{errorMessage}</p>}
        <Button
          theme="primary"
          size="sm"
          ariaLabel="Se connecter avec GitHub"
          onClick={handleSignIn}
          disabled={loading}
          className="m-8"
        >
          {loading ? (
            <LuLoaderCircle size={28} className="animate-spin" />
          ) : (
            <>
              <IoLogoGithub size={28} />
              <span>Connexion avec Github</span>
            </>
          )}
        </Button>

        <p className="text-center text-gray-600">
          Connexion pour accéder à l&apos;administration du portfolio. Cette
          interface permet de gérer facilement le contenu des projets,
          compétences et images.
        </p>
        <p className="text-center text-gray-600 mt-2">
          Simple et sécurisé avec l&apos;utilisation du compte GitHub pour
          modifier et mettre à jour le portfolio en quelques clics.
        </p>
        <ul className="mt-4 list-disc list-inside text-gray-600">
          <li>Ajoutez ou modifiez des projets.</li>
          <li>Mettez à jour les compétences et informations.</li>
          <li>Gérez les médias et les images du portfolio.</li>
        </ul>
      </section>
    </>
  );
}
