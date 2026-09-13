import { ROUTES } from "./routes";

export function isTrustTapPath(pathname: string) {
  return pathname === ROUTES.trustTap || pathname === ROUTES.trustTapShort;
}

export function findInPageTrustTapHashTarget(href: string, currentPathname: string) {
  const [pathname = "", hash = ""] = href.split("#");
  if (!hash || !isTrustTapPath(currentPathname)) {
    return null;
  }
  if (pathname && !isTrustTapPath(pathname)) {
    return null;
  }
  return document.getElementById(hash);
}

export function handleTrustTapInPageHashClick(
  event: { preventDefault: () => void },
  href: string,
  currentPathname: string,
  navigate: (to: { pathname: string; hash: string }) => void,
) {
  const target = findInPageTrustTapHashTarget(href, currentPathname);
  if (!target) {
    return false;
  }
  event.preventDefault();
  navigate({
    pathname: currentPathname === ROUTES.trustTapShort ? ROUTES.trustTap : currentPathname,
    hash: `#${href.split("#")[1]}`,
  });
  return true;
}
