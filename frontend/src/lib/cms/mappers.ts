import { PRIMARY_NAV_ITEMS } from "../navSections";
import { ROUTES } from "../routes";
import { resolveServiceDetailHref } from "../services";
import { STITCH_COPY } from "../stitchDesign";
import { STITCH_SERVICES_GRID, type StitchServiceCard } from "../stitchPageContent";
import { SITE_FOOTER_COPY, SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS, SITE_FOOTER_PRIMARY_NAV_LINK_LABELS, SITE_FOOTER_RESOURCES_LINK_LABELS, type FooterLinkCell, type FooterNavColumn } from "../siteFooterCopy";
import { CONTACT_STUDIO } from "../contactPageContent";
import { buildMailtoPublicContactHref, publicContactEmailDisplay } from "../siteContact";
import { JOIN_US_POSITION_OPTIONS } from "../joinUsPositions";
import { LEAD_SERVICE_LABELS } from "../leadServices";
import { COMMITERS_HEADER_LOGO_ALT, COMMITERS_HEADER_LOGO_SRC } from "../siteBrand";
import { hasCmsDoc, hasCmsItems } from "./api";
import { resolveBrandLogoSrc } from "./media";


const SERVICE_ICONS = new Set(["website", "ai", "webapp", "mobile", "automation", "mvp", "ecommerce"]);
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeInternalPath(path: string): string {
  const normalized = path.replace(/\/+$/, "") || "/";
  if (normalized === "/open-position" || normalized === "/job-positions" || normalized === "/job-position") {
    return ROUTES.openPositions;
  }
  return path;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

export function mapCmsServiceToCard(service: Record<string, unknown>, index: number): StitchServiceCard {
  const rawIcon = asString(service.icon, "website");
  const icon = (SERVICE_ICONS.has(rawIcon) ? rawIcon : "website") as StitchServiceCard["icon"];
  const title = asString(service.title, `Service ${index + 1}`);
  const id = asString(service.slug) || slugify(title) || `service-${index + 1}`;
  const fallback = STITCH_SERVICES_GRID.find((s) => s.id === id || s.title === title);

  return {
    id,
    title,
    description: asString(service.description, fallback?.description ?? ""),
    icon,
    gridSpan: 1,
    layout: "standard",
    hoverAction: fallback?.hoverAction ?? {
      kind: "link",
      label: "View service",
      href: resolveServiceDetailHref({ id, title, icon: rawIcon }),
    },
    actionVisibility: "always" as const,
  };
}

export function resolveServicesGrid(cmsServices: Record<string, unknown>[] | null | undefined): StitchServiceCard[] {
  if (!hasCmsItems(cmsServices)) return STITCH_SERVICES_GRID;
  return cmsServices.map(mapCmsServiceToCard);
}

export type NavItem = { id: string; label: string; to: string; end?: boolean };

export function resolveNavbar(cmsNavbar: Record<string, unknown> | null | undefined) {
  const fallbackNav = PRIMARY_NAV_ITEMS.map((item) => ({
    id: item.id,
    label: item.label,
    to: item.to,
    end: item.end,
  }));

  if (!hasCmsDoc(cmsNavbar)) {
    return {
      logo: COMMITERS_HEADER_LOGO_SRC,
      logoAlt: COMMITERS_HEADER_LOGO_ALT,
      navItems: fallbackNav,
      ctaLabel: STITCH_COPY.navCta,
      ctaUrl: ROUTES.contact,
    };
  }

  const links = Array.isArray(cmsNavbar.navLinks) ? cmsNavbar.navLinks : [];
  const navItems: NavItem[] =
    links.length > 0
      ? (links
          .map((link, index) => {
            const row = asRecord(link);
            if (!row) return null;
            const to = normalizeInternalPath(asString(row.url, "/"));
            const order = Number(row.order);
            return {
              id: slugify(asString(row.label, `nav-${index}`)) || `nav-${index}`,
              label: asString(row.label, "Link"),
              to,
              end: to === ROUTES.home,
              order: Number.isFinite(order) ? order : index + 1,
            };
          })
          .filter(Boolean) as Array<NavItem & { order: number }>)
          .sort((a, b) => a.order - b.order)
          .map(({ order: _order, ...item }) => item)
      : fallbackNav;

  return {
    logo: resolveBrandLogoSrc(cmsNavbar.logo),
    logoAlt: asString(cmsNavbar.logoAlt, COMMITERS_HEADER_LOGO_ALT),
    navItems,
    ctaLabel: asString(cmsNavbar.ctaLabel, STITCH_COPY.navCta),
    ctaUrl: asString(cmsNavbar.ctaUrl, ROUTES.contact),
  };
}

function mapFooterLink(link: Record<string, unknown>): FooterLinkCell | null {
  const label = asString(link.label);
  const url = asString(link.url);
  if (!label || !url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return { kind: "external", label, href: url, external: true };
  }
  return { kind: "internal", label, to: normalizeInternalPath(url) };
}

const SOCIAL_LINK_ORDER = ["LinkedIn", "WhatsApp", "Instagram", "Medium"] as const;

function footerLinkTarget(link: FooterLinkCell): string {
  return link.kind === "internal" ? link.to : link.href;
}

function mergeLinkGroups(cmsLinks: FooterLinkCell[] | null, fallbackLinks: readonly FooterLinkCell[]): FooterLinkCell[] {
  if (!cmsLinks?.length) return [...fallbackLinks];

  const merged = [...cmsLinks];
  for (const defaultLink of fallbackLinks) {
    const defaultTarget = footerLinkTarget(defaultLink);
    const exists = merged.some(
      (link) =>
        footerLinkTarget(link) === defaultTarget ||
        link.label.toLowerCase() === defaultLink.label.toLowerCase(),
    );
    if (!exists) merged.push(defaultLink);
  }
  return merged;
}

function orderLinksByLabels(links: FooterLinkCell[], labels: readonly string[]): FooterLinkCell[] {
  const byLabel = new Map(links.map((link) => [link.label.toLowerCase(), link]));
  return labels
    .map((label) => byLabel.get(label.toLowerCase()))
    .filter((link): link is FooterLinkCell => Boolean(link));
}

function mergePrimaryLinks(cmsLinks: FooterLinkCell[] | null): FooterLinkCell[] {
  return orderLinksByLabels(
    mergeLinkGroups(cmsLinks, [...SITE_FOOTER_COPY.navColumns[0].links]),
    SITE_FOOTER_PRIMARY_NAV_LINK_LABELS,
  );
}

function mergeResourcesLinks(cmsLinks: FooterLinkCell[] | null): FooterLinkCell[] {
  return orderLinksByLabels(
    mergeLinkGroups(cmsLinks, [...SITE_FOOTER_COPY.navColumns[1].links]),
    SITE_FOOTER_RESOURCES_LINK_LABELS,
  );
}

function mergeLegalLinks(cmsLinks: FooterLinkCell[] | null): FooterLinkCell[] {
  return orderLinksByLabels(
    mergeLinkGroups(cmsLinks, [...SITE_FOOTER_COPY.bottomLegalLinks]),
    SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
  );
}

function stripAdminLinks(links: readonly FooterLinkCell[]): FooterLinkCell[] {
  return links.filter((link) => link.label.trim().toLowerCase() !== "admin");
}

function stripAdminColumns(columns: readonly FooterNavColumn[]): FooterNavColumn[] {
  return columns.map((column) => ({
    ...column,
    links: stripAdminLinks(column.links),
  }));
}

function mergeSocialLinks(cmsLinks: FooterLinkCell[] | null): FooterLinkCell[] {
  const fallbackLinks = [...SITE_FOOTER_COPY.socialLinks];
  const merged = cmsLinks?.length ? [...cmsLinks] : [...fallbackLinks];

  for (const defaultLink of fallbackLinks) {
    const exists = merged.some((link) => link.label.toLowerCase() === defaultLink.label.toLowerCase());
    if (!exists) merged.push(defaultLink);
  }

  return merged.sort((a, b) => {
    const aIndex = SOCIAL_LINK_ORDER.indexOf(a.label as (typeof SOCIAL_LINK_ORDER)[number]);
    const bIndex = SOCIAL_LINK_ORDER.indexOf(b.label as (typeof SOCIAL_LINK_ORDER)[number]);
    return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
  });
}

export function resolveFooter(
  cmsFooter: Record<string, unknown> | null | undefined,
): {
  brandTagline: string;
  copyrightLine1: string;
  socialLinks: readonly FooterLinkCell[];
  bottomLegalLinks: readonly FooterLinkCell[];
  navColumns: readonly FooterNavColumn[];
} {
  const fallback = SITE_FOOTER_COPY;

  if (!hasCmsDoc(cmsFooter)) {
    return {
      brandTagline: fallback.brandTagline,
      copyrightLine1: fallback.copyrightLine1,
      socialLinks: fallback.socialLinks,
      bottomLegalLinks: stripAdminLinks(fallback.bottomLegalLinks),
      navColumns: stripAdminColumns(fallback.navColumns),
    };
  }

  const navigationLinks = Array.isArray(cmsFooter.navigationLinks)
    ? cmsFooter.navigationLinks
        .map(asRecord)
        .filter(Boolean)
        .sort((a, b) => {
          const aOrder = typeof a.order === "number" ? a.order : 0;
          const bOrder = typeof b.order === "number" ? b.order : 0;
          return aOrder - bOrder;
        })
        .map(mapFooterLink)
        .filter(Boolean)
    : null;
  const legalLinks = Array.isArray(cmsFooter.legalLinks)
    ? cmsFooter.legalLinks
        .map(asRecord)
        .filter(Boolean)
        .sort((a, b) => {
          const aOrder = typeof a.order === "number" ? a.order : 0;
          const bOrder = typeof b.order === "number" ? b.order : 0;
          return aOrder - bOrder;
        })
        .map(mapFooterLink)
        .filter(Boolean)
    : null;
  const socialLinks = Array.isArray(cmsFooter.socialLinks)
    ? cmsFooter.socialLinks
        .map((link) => {
          const row = asRecord(link);
          if (!row) return null;
          const label = asString(row.platform);
          const href = asString(row.url);
          if (!label || !href) return null;
          return { kind: "external" as const, label, href, external: true as const };
        })
        .filter(Boolean) as FooterLinkCell[]
    : null;

  const navColumns: FooterNavColumn[] = [
    {
      heading: "PRIMARY",
      links: mergePrimaryLinks(navigationLinks),
    },
    {
      heading: "RESOURCES",
      links: mergeResourcesLinks(null),
    },
  ];

  return {
    brandTagline: asString(cmsFooter.description, fallback.brandTagline),
    copyrightLine1: asString(cmsFooter.copyright, fallback.copyrightLine1),
    socialLinks: mergeSocialLinks(socialLinks),
    bottomLegalLinks: stripAdminLinks(mergeLegalLinks(legalLinks)),
    navColumns: stripAdminColumns(navColumns),
  };
}

export function resolveAbout(cmsAbout: Record<string, unknown> | null | undefined) {
  return {
    kicker: STITCH_COPY.engineeringPrecision,
    title: hasCmsDoc(cmsAbout) ? asString(cmsAbout.heading, STITCH_COPY.about.title) : STITCH_COPY.about.title,
    subtext: hasCmsDoc(cmsAbout) ? asString(cmsAbout.description, STITCH_COPY.about.subtext) : STITCH_COPY.about.subtext,
    visionTitle: STITCH_COPY.about.visionTitle,
    visionBody: hasCmsDoc(cmsAbout) ? asString(cmsAbout.vision, STITCH_COPY.about.visionBody) : STITCH_COPY.about.visionBody,
    mission: hasCmsDoc(cmsAbout) ? asString(cmsAbout.mission, "") : "",
    founderImage:
      hasCmsDoc(cmsAbout) && Array.isArray(cmsAbout.images) && cmsAbout.images[0]
        ? asString(cmsAbout.images[0])
        : undefined,
    statistics:
      hasCmsDoc(cmsAbout) && Array.isArray(cmsAbout.statistics) && cmsAbout.statistics.length
        ? cmsAbout.statistics
            .map((stat) => {
              const row = asRecord(stat);
              if (!row) return null;
              return { value: asString(row.value), label: asString(row.label) };
            })
            .filter(Boolean)
        : null,
  };
}

export function resolveContactStudio(cmsContact: Record<string, unknown> | null | undefined) {
  if (!hasCmsDoc(cmsContact)) return CONTACT_STUDIO;

  const address = asString(cmsContact.address, CONTACT_STUDIO.addressLines.join("\n"));
  const addressLines = address.split("\n").map((line) => line.trim()).filter(Boolean);

  const rawEmail = asString(cmsContact.email, CONTACT_STUDIO.email);

  return {
    title: asString(cmsContact.companyName, CONTACT_STUDIO.title),
    addressLines: addressLines.length ? addressLines : [...CONTACT_STUDIO.addressLines],
    email: publicContactEmailDisplay(rawEmail),
    emailHref: buildMailtoPublicContactHref(rawEmail),
    phone: asString(cmsContact.phone, CONTACT_STUDIO.phone),
    phoneHref: `tel:${asString(cmsContact.phone, CONTACT_STUDIO.phone).replace(/[^\d+]/g, "")}`,
    mapEmbedUrl: asString(cmsContact.googleMapEmbedUrl),
    whatsappUrl: asString(cmsContact.whatsappUrl),
    calendarUrl: asString(cmsContact.calendarUrl),
  };
}

export function resolveJoinUsPositions(cmsJobs: Record<string, unknown>[] | null | undefined): readonly string[] {
  if (!hasCmsItems(cmsJobs)) return JOIN_US_POSITION_OPTIONS;
  const titles = cmsJobs
    .filter((job) => {
      const status = asString(job.status);
      return !status || status === "open";
    })
    .map((job) => asString(job.title))
    .filter(Boolean);
  return titles.length ? [...titles, "Other"] : JOIN_US_POSITION_OPTIONS;
}

export function resolveLeadServices(cmsServices: Record<string, unknown>[] | null | undefined): readonly string[] {
  if (!hasCmsItems(cmsServices)) return LEAD_SERVICE_LABELS;
  const titles = cmsServices.map((s) => asString(s.title)).filter(Boolean);
  return titles.length ? titles : LEAD_SERVICE_LABELS;
}
