import StudioProductPage from "../components/StudioProductPage";
import { usePageSeo } from "../hooks/usePageSeo";
import { SYNAPSE_PRODUCT } from "../lib/studioProducts";
import { synapsePageSeo } from "../lib/sitePageSeo";

export default function SynapsePage() {
  usePageSeo(synapsePageSeo());
  return <StudioProductPage product={SYNAPSE_PRODUCT} />;
}
