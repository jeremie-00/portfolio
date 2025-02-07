"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { IoLogOutOutline, IoTrashBinSharp } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";
import { Button } from "../components/buttons/buttons";
import { Container } from "../components/containers";
import { ParticlesBackground } from "../components/particles";
import { showToast } from "../components/toast";
import {
  createRevokedToken,
  deleteOldRevokedTokens,
} from "../services/revokedToken.actions";
import { AboutProvider } from "./about/providersAbout";
import TableAbout from "./about/tableAbout";
import { AvatarProvider } from "./avatar/providersAvatar";
import TableAvatar from "./avatar/tableAvatar";
import { NotationProvider } from "./notation/providersNotation";
import TableNotation from "./notation/tableNotations";
import { SectionProvider } from "./sections/providersSections";
import TableSections from "./sections/tableSections";
import { SkillProvider } from "./skills/providersSkills";
import TableSkill from "./skills/tableSkills";

export default function Dashboard() {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const token = session?.accessToken;
    if (token) await createRevokedToken(token);
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  const handleDeleteRevokedToken = async () => {
    setLoadingDelete(true);
    const response = await deleteOldRevokedTokens();
    const { status, message } = response.data;
    showToast(status, message);
    setLoadingDelete(false);
  };

  return (
    <>
      <ParticlesBackground />
      <section className="section flex-col items-center justify-center">
        <Container>
          {/* Bouton de déconnexion */}
          <Button
            theme="primary"
            size="sm"
            onClick={handleLogout}
            aria-label="Deconnexion"
          >
            {loading ? (
              <LuLoaderCircle size={28} className="animate-spin" />
            ) : (
              <>
                <IoLogOutOutline size={28} />
                <span>Deconnexion</span>
              </>
            )}
          </Button>
          <Button
            theme="delete"
            size="sm"
            onClick={handleDeleteRevokedToken}
            aria-label="Supprimer le jeton révoqué"
          >
            {loadingDelete ? (
              <LuLoaderCircle size={28} className="animate-spin" />
            ) : (
              <>
                <IoTrashBinSharp size={28} />
                <span>Token révoqué</span>
              </>
            )}
          </Button>
          <h1 className="h1">Dashboard</h1>
          <p className="p">Hello {session?.user?.name}</p>
          <SkillProvider>
            <TableSkill />
          </SkillProvider>
          <NotationProvider>
            <TableNotation />
          </NotationProvider>
          <SectionProvider>
            <TableSections />
          </SectionProvider>
          <AboutProvider>
            <TableAbout />
          </AboutProvider>
          <AvatarProvider>
            <TableAvatar />
          </AvatarProvider>
        </Container>
      </section>
    </>
  );
}
