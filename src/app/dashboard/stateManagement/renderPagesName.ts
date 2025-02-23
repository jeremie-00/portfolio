import { useLinks } from "../link/useLinks";

export default function RenderPagesName() {
  const { datas: pages } = useLinks();
  return pages.filter((page) => page);
}
