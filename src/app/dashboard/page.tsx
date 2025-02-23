"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { IoLogOutOutline, IoTrashBinSharp } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";
import { Button } from "../components/buttons/buttons";
import { Container } from "../components/containers";
import { showToast } from "../components/toast";
import {
  createRevokedToken,
  deleteOldRevokedTokens,
} from "../services/revokedToken.actions";
import EditAboutTable from "./about/table/EditAboutTable";
import EditAvatarTable from "./avatar/table/EditAvatarTable";
import EditLinksTable from "./link/table/EditLinksTable";
import EditNotationTable from "./notation/table/EditNotationTable";
import EditProjetTable from "./projet/table/EditProjetsTable";
import EditSectionsTable from "./sections/table/EditSectionsTable";
import EditSkillsTable from "./skills/table/EditSkillsTable";
import { DeleteModal } from "./stateManagement/deleteDialogModal";
import { FormulaireProvider } from "./stateManagement/formulaireContext";
import { ModalProvider } from "./stateManagement/modalContext";

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
      <ModalProvider>
        <section className="section flex-col items-center justify-center">
          <Container>
            {/* Bouton de déconnexion */}
            <div className="flex items-center justify-center  gap-6">
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
            </div>

            <h1 className="h1">Dashboard</h1>
            <p className="p">Hello {session?.user?.name}</p>
            <section className="relative w-full h-full">
              <FormulaireProvider>
                <EditProjetTable />
              </FormulaireProvider>
            </section>
            <section className="relative w-full h-full">
              <FormulaireProvider>
                <EditAvatarTable />
              </FormulaireProvider>
            </section>
            <section className="relative w-full h-full">
              <FormulaireProvider>
                <EditAboutTable />
              </FormulaireProvider>
            </section>
            <section className="relative w-full h-full">
              <FormulaireProvider>
                <EditSectionsTable />
              </FormulaireProvider>
            </section>
            <section className="relative w-full h-full">
              <FormulaireProvider>
                <EditSkillsTable />
              </FormulaireProvider>
            </section>
            <section className="relative w-full h-full">
              <FormulaireProvider>
                <EditLinksTable />
              </FormulaireProvider>
            </section>
            <section className="relative w-full h-full">
              <FormulaireProvider>
                <EditNotationTable />
              </FormulaireProvider>
            </section>
          </Container>
        </section>
        <DeleteModal />
      </ModalProvider>
    </>
  );
}
