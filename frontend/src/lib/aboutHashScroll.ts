import { isAboutPath } from "./landingPageHashScroll";
import { ROUTES } from "./routes";

export { isAboutPath };

export function findInPageAboutHashTarget(href: string, currentPathname: string) {
  const [pathname = "", hash = ""] = href.split("#");
  if (!hash || !isAboutPath(currentPathname)) {
    return null;
  }
  if (pathname && pathname !== ROUTES.about) {
    return null;
  }
  return document.getElementById(hash);
}

export function handleAboutInPageHashClick(
  event: { preventDefault: () => void },
  href: string,
  currentPathname: string,
  navigate: (to: { pathname: string; hash: string }) => void,
) {
  const target = findInPageAboutHashTarget(href, currentPathname);
  if (!target) {
    return false;
  }
  event.preventDefault();
  navigate({
    pathname: ROUTES.about,
    hash: `#${href.split("#")[1]}`,
  });
  return true;
}
