import { isServicesPath } from "./landingPageHashScroll";
import { ROUTES } from "./routes";

export { isServicesPath };

export function findInPageServicesHashTarget(href: string, currentPathname: string) {
  const [pathname = "", hash = ""] = href.split("#");
  if (!hash || !isServicesPath(currentPathname)) {
    return null;
  }
  if (pathname && pathname !== ROUTES.services) {
    return null;
  }
  return document.getElementById(hash);
}

export function handleServicesInPageHashClick(
  event: { preventDefault: () => void },
  href: string,
  currentPathname: string,
  navigate: (to: { pathname: string; hash: string }) => void,
) {
  const target = findInPageServicesHashTarget(href, currentPathname);
  if (!target) {
    return false;
  }
  event.preventDefault();
  navigate({
    pathname: ROUTES.services,
    hash: `#${href.split("#")[1]}`,
  });
  return true;
}
