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
        src={"/favicon-192x192.png"}
        alt={"Logo H"}
        width={192}
        height={192}
        className="w-12 h-12"
        loading="lazy"
      />
    </Link>
  );
}
