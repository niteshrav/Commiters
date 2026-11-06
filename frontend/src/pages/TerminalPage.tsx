import StudioProductPage from "../components/StudioProductPage";
import { usePageSeo } from "../hooks/usePageSeo";
import { TERMINAL_PRODUCT } from "../lib/studioProducts";
import { terminalPageSeo } from "../lib/sitePageSeo";

export default function TerminalPage() {
  usePageSeo(terminalPageSeo());
  return <StudioProductPage product={TERMINAL_PRODUCT} />;
}
