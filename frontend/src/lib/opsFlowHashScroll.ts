import { ROUTES } from "./routes";

export function isOpsFlowPath(pathname: string) {
  return pathname === ROUTES.opsFlow || pathname === ROUTES.opsFlowPlayground || pathname === ROUTES.opsFlowAi;
}

export function findInPageOpsFlowHashTarget(href: string, currentPathname: string) {
  const [pathname = "", hash = ""] = href.split("#");
  if (!hash || !isOpsFlowPath(currentPathname)) {
    return null;
  }
  if (pathname && !isOpsFlowPath(pathname)) {
    return null;
  }
  return document.getElementById(hash);
}

export function handleOpsFlowInPageHashClick(
  event: { preventDefault: () => void },
  href: string,
  currentPathname: string,
  navigate: (to: { pathname: string; hash: string }) => void,
) {
  const target = findInPageOpsFlowHashTarget(href, currentPathname);
  if (!target) {
    return false;
  }
  event.preventDefault();
  navigate({
    pathname: currentPathname === ROUTES.opsFlowAi ? ROUTES.opsFlowPlayground : currentPathname,
    hash: `#${href.split("#")[1]}`,
  });
  return true;
}
