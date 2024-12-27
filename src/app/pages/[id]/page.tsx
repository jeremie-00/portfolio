import Section from "@/app/components/pages/section";
import { getSectionsByPage } from "@/app/services/section.action";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = (await params).id;
  const allSections = await getSectionsByPage(paramsId);
  console.log(allSections.length, paramsId);
  return (
    <>
      {allSections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </>
  );
}
