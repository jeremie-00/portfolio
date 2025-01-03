import {
  getSectionsForHeader,
  getSectionsForSubMenu,
} from "@/app/services/section.action";
import Link from "next/link";
import HeaderComponent from "./headerComponent";

export default async function Header() {
  const links = await getSectionsForHeader();
  const subLinks = await getSectionsForSubMenu();

  if (!links.length) {
    return (
      <header className="w-full h-full flex flex-col items-center justify-center bg-gray-500">
        <ol className="w-full flex items-center justify-center">
          <li className="w-full flex items-center justify-center">
            <Link href={`/`} className="text-white text-xl text-center">
              Lien par défaut vers accueil
            </Link>
          </li>
        </ol>
      </header>
    );
  }

  return <HeaderComponent links={links} subLinks={subLinks} />;
}
