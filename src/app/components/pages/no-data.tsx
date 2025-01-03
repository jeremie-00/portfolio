export function NoData({ dataName }: { dataName: string }) {
  return (
    <section className="w-full flex items-center justify-center p-2">
      <h2 className="text-3xl text-center text-white flex flex-col gap-4">
        Pas encore de {dataName} dans la base de données...
        <span>L&apos;aventure ne fait que commencer ! 🚀</span>
      </h2>
    </section>
  );
}
