import { handleAboutInPageHashClick } from "./aboutHashScroll";
import { handleOpsFlowInPageHashClick } from "./opsFlowHashScroll";
import { handleServicesInPageHashClick } from "./servicesHashScroll";
import { handleTrustTapInPageHashClick } from "./trustTapHashScroll";

export function handleInPageProductHashClick(
  event: { preventDefault: () => void },
  href: string,
  currentPathname: string,
  navigate: (to: { pathname: string; hash: string }) => void,
) {
  return (
    handleTrustTapInPageHashClick(event, href, currentPathname, navigate) ||
    handleOpsFlowInPageHashClick(event, href, currentPathname, navigate) ||
    handleServicesInPageHashClick(event, href, currentPathname, navigate) ||
    handleAboutInPageHashClick(event, href, currentPathname, navigate)
  );
}
