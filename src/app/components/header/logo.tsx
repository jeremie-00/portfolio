import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center hover:scale-105 transition-scale duration-300"
    >
      {/* <div className="flex items-end gap-2 text-2xl font-bold">
        Jerem
        <span className="text-primary w-3 h-3 rounded-full border-2 border-primary bg-primary"></span>
      </div> */}

      <Image
        src={"/favicon-192x192.png"}
        alt={"Logo H"}
        width={150}
        height={150}
        className="w-12 h-12"
      />
    </Link>
  );
}
