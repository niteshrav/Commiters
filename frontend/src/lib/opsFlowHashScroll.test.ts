import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { findInPageOpsFlowHashTarget, handleOpsFlowInPageHashClick, isOpsFlowPath } from "./opsFlowHashScroll";

describe("opsFlowHashScroll", () => {
  it("only intercepts hash clicks that already belong to the OpsFlow page", () => {
    expect(isOpsFlowPath(ROUTES.opsFlow)).toBe(true);
    expect(isOpsFlowPath(ROUTES.opsFlowPlayground)).toBe(true);
    expect(isOpsFlowPath(ROUTES.opsFlowAi)).toBe(true);
    expect(isOpsFlowPath(ROUTES.home)).toBe(false);

    document.body.innerHTML = '<section id="sandbox"></section>';
    expect(findInPageOpsFlowHashTarget(`${ROUTES.opsFlowAi}#sandbox`, ROUTES.home)).toBeNull();
    expect(findInPageOpsFlowHashTarget(`${ROUTES.opsFlowAi}#sandbox`, ROUTES.opsFlowPlayground)?.id).toBe("sandbox");
    document.body.innerHTML = "";
  });

  it.each([ROUTES.opsFlow, ROUTES.opsFlowPlayground, ROUTES.opsFlowAi])(
    "navigates to the canonical OpsFlow route from %s while preserving the hash",
    (pathname) => {
      document.body.innerHTML = '<section id="sandbox"></section>';
      const event = { preventDefault: vi.fn() };
      const navigate = vi.fn();

      expect(handleOpsFlowInPageHashClick(event, "#sandbox", pathname, navigate)).toBe(true);
      expect(event.preventDefault).toHaveBeenCalledOnce();
      expect(navigate).toHaveBeenCalledWith({ pathname: ROUTES.opsFlow, hash: "#sandbox" });
      document.body.innerHTML = "";
    },
  );
});
