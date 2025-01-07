import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src={"/favicon.ico" || "../../default.svg"}
        alt={"Logo" || "Image par défaut"}
        width={150}
        height={150}
        className="w-12 h-12"
      />
    </Link>
  );
}
