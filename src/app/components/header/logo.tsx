"use client";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center hover:scale-105 transition-scale duration-300"
    >
      <Image
        src={"/icon.svg"}
        alt={"Logo JH"}
        width={600}
        height={600}
        className="w-12 h-12"
        loading="lazy"
      />
    </Link>
  );
}
