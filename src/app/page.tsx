import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-6xl font-bold">
        Welcome to <span className="text-primary-500">Next.js</span>
      </h1>

      <Image
        className="mx-auto mt-8"
        src="/vercel.svg"
        alt="Vercel Logo"
        width={200}
        height={100}
      />

      <p className="mt-6 text-center text-gray-500">
        Get started by editing
        <code className="px-2 py-1 rounded bg-gray-100 text-gray-800">
          src/app/page.tsx
        </code>
      </p>
    </main>
  );
}
