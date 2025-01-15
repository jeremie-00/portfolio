import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center hover:scale-105 transition-scale duration-300"
    >
      <Image
        src={"/favicon.ico"}
        alt={"Logo H"}
        width={150}
        height={150}
        className="w-12 h-12"
      />
    </Link>
  );
}
