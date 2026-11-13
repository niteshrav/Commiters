import { ROUTES } from "./routes";
import type { WorkCaseStudy, WorkCaseStudyCta } from "./workCaseStudy";

/** Set when NEWSORA is deployed. An empty value hides the live-demo button. */
export const NEWSORA_LIVE_URL = "";

export const NEWSORA_CASE_STUDY_COPY = {
  documentTitle: "NEWSORA Digital News Platform Case Study",
  subtitle:
    "NEWSORA is a WordPress news and media platform for national, international, business, technology, sports, entertainment, and digital newspaper reading.",
} as const;

const liveCta: WorkCaseStudyCta | undefined = NEWSORA_LIVE_URL
  ? { kind: "external", label: "View Live Demo", href: NEWSORA_LIVE_URL }
  : undefined;

export const NEWSORA_WORK_CASE_STUDY: WorkCaseStudy = {
  id: "newsora",
  route: ROUTES.newsoraCaseStudy,
  pageTestId: "newsora-case-study-page",
  pageClass: "newsora-case-study",
  name: "NEWSORA",
  kicker: "WordPress Development · News & Media",
  headline: "NEWSORA",
  lead: "Everything Happening. One Destination.",
  heroImage: {
    src: "/assets/case-studies/work-newsora.jpg",
    alt: "NEWSORA homepage on a laptop and phone, with India, World, Business, Technology, Sports, Entertainment, and E-Paper",
  },
  exploreCta: liveCta ?? { kind: "internal", label: "Read the study", to: "#wcs-overview" },
  discussCta: { kind: "internal", label: "Start a similar brief", to: ROUTES.contact },
  liveDemo: liveCta,
  finalCta: {
    title: "Looking to Build Your Own WordPress Website?",
    body: "Let's create a professional digital experience tailored to your business.",
    primaryLabel: "Start Your Project",
    primaryTo: ROUTES.contact,
  },
  heroFacts: [
    { label: "Category", value: "WordPress Development" },
    { label: "Focus", value: "News & Media" },
    { label: "CMS", value: "WordPress" },
  ],
  overview: {
    kicker: "01 / Overview",
    title: "Project overview",
    lead: "NEWSORA is a modern digital news and media publishing platform designed to bring national, international, business, technology, sports, entertainment, and digital newspaper experiences together in one place. The platform focuses on organized content discovery, seamless reading, and responsive digital publishing.",
    items: [
      { label: "Project", value: "NEWSORA – Digital News & Media Platform" },
      { label: "Category", value: "WordPress Development | News & Media" },
      { label: "Tagline", value: "Everything Happening. One Destination." },
      { label: "Publishing", value: "Managed in the WordPress dashboard" },
    ],
  },
  problem: {
    kicker: "02 / Challenge",
    title: "The challenge",
    lead: "A newsroom that covers several beats still needs one front door. National and international reporting, business, technology, sports, entertainment, and a digital newspaper can easily become separate destinations that are hard to browse on a phone.",
    items: [
      {
        id: "many-beats",
        title: "Many beats, one destination",
        body: "Readers need a clear way to move between news categories without losing the story they came for.",
      },
      {
        id: "epaper",
        title: "A newspaper and a website",
        body: "The digital newspaper has to sit beside the latest feed, not in a separate product with its own navigation.",
      },
    ],
  },
  solution: {
    kicker: "03 / Solution",
    title: "Our solution",
    lead: "NEWSORA is built on WordPress so editors publish from one dashboard. Structured categories, an editorial homepage, and a responsive layout keep national, international, business, technology, sports, entertainment, and e-paper reading in one site.",
    items: [
      {
        id: "cms",
        title: "WordPress as the publishing system",
        body: "Stories, categories, and the digital newspaper are managed through the WordPress dashboard.",
      },
      {
        id: "structure",
        title: "Categories with an editorial layout",
        body: "The homepage, category navigation, and article pages give each beat a place without splitting the publication.",
      },
      {
        id: "responsive",
        title: "Reading that fits the screen",
        body: "The same structure is laid out for desktop, tablet, and mobile.",
      },
    ],
  },
  usp: {
    kicker: "04 / Structure",
    title: "How the reading experience holds together",
    lead: "The publication stays in one place because the homepage, the category navigation, and the article page share the same WordPress content.",
    items: [
      {
        id: "destination",
        title: "One destination",
        body: "National, international, business, technology, sports, entertainment, and the digital newspaper are sections of the same site.",
      },
      {
        id: "discovery",
        title: "More than one way in",
        body: "The latest feed, featured and trending stories, category navigation, and search all open onto the same articles.",
      },
      {
        id: "editors",
        title: "Editors stay in WordPress",
        body: "New stories are added from the WordPress dashboard, using Gutenberg and Spectra in the theme.",
      },
    ],
  },
  journey: {
    kicker: "08 / Screenshots",
    title: "Website in view",
    lead: "The homepage and the phone layout, shown together.",
    items: [
      {
        src: "/assets/case-studies/work-newsora.jpg",
        alt: "NEWSORA homepage on a laptop and phone, with India, World, Business, Technology, Sports, Entertainment, and E-Paper",
        title: "Homepage and mobile",
        body: "The news homepage, category navigation, latest stories, and the same layout on a phone.",
      },
    ],
  },
  details: {
    kicker: "04 / Features",
    title: "Key features",
    lead: "The publication is organized around these reading and publishing surfaces.",
    items: [
      { id: "home", title: "Modern news homepage", body: "A front page for the latest stories and the sections readers return to." },
      { id: "feed", title: "Latest news feed", body: "A running feed of newly published stories." },
      { id: "nav", title: "Category-based navigation", body: "Readers move between beats from the site navigation." },
      { id: "world", title: "National and international news", body: "Dedicated sections for national and international coverage." },
      { id: "business", title: "Business and technology", body: "Separate sections for business and technology reporting." },
      { id: "sports", title: "Sports and entertainment", body: "Sports and entertainment each have their own section." },
      { id: "epaper", title: "Digital newspaper", body: "An e-paper section for the digital newspaper experience." },
      { id: "featured", title: "Featured and trending", body: "Selected and trending stories are surfaced for quicker discovery." },
      { id: "article", title: "Article pages", body: "Each story has its own page." },
      { id: "search", title: "Search", body: "Readers can search the publication." },
      { id: "mobile", title: "Responsive layout", body: "The site is laid out for mobile reading." },
      { id: "dashboard", title: "WordPress dashboard", body: "Editors manage content from the WordPress dashboard." },
    ],
  },
  flow: {
    kicker: "05 / Process",
    title: "Design and development",
    lead: "The build followed the publishing structure: set up WordPress, shape the theme, then organize the content and check it on smaller screens.",
    items: [
      { id: "plan", title: "Planning and research", body: "Mapped the beats, the homepage, the article page, and the e-paper section before theme work began." },
      { id: "setup", title: "WordPress setup", body: "Installed WordPress with PHP and MySQL or MariaDB as the publishing base." },
      { id: "theme", title: "Theme and design customization", body: "Customized the theme, including Gutenberg and Spectra, for an editorial reading layout." },
      { id: "content", title: "Content structure", body: "Organized categories for national, international, business, technology, sports, entertainment, and the digital newspaper." },
      { id: "features", title: "Feature implementation", body: "Implemented the homepage, feeds, article pages, search, and featured stories on that structure." },
      { id: "responsive", title: "Responsive optimization", body: "Adjusted the layout so category navigation and articles remain readable on smaller screens." },
      { id: "testing", title: "Testing", body: "Checked navigation, article pages, search, and the responsive layout before considering the build complete." },
    ],
  },
  stack: {
    kicker: "06 / Stack",
    title: "Technology stack",
    lead: "The publication runs on WordPress and the languages that theme and content rely on.",
    items: [
      { id: "wordpress", group: "CMS", title: "WordPress", logo: { slug: "wordpress", alt: "WordPress" } },
      { id: "php", group: "Language", title: "PHP", logo: { slug: "php", alt: "PHP" } },
      { id: "mysql", group: "Database", title: "MySQL", logo: { slug: "mysql", alt: "MySQL" } },
      { id: "mariadb", group: "Database", title: "MariaDB", logo: { slug: "mariadb", alt: "MariaDB" } },
      { id: "gutenberg", group: "Editor", title: "Gutenberg" },
      { id: "spectra", group: "Blocks", title: "Spectra" },
      { id: "html", group: "Markup", title: "HTML5", logo: { slug: "html5", alt: "HTML5" } },
      { id: "css", group: "Style", title: "CSS3", logo: { slug: "css", alt: "CSS" } },
    ],
  },
  outcome: {
    kicker: "07 / Highlights",
    title: "Project highlights",
    lead: "What the build puts in place. These are product capabilities, not traffic or performance claims.",
    items: [
      { id: "one-destination", title: "One publication", body: "National, international, business, technology, sports, entertainment, and the digital newspaper share one site." },
      { id: "discovery", title: "Organized discovery", body: "Homepage, category navigation, featured stories, and search give readers more than one way into a story." },
      { id: "editing", title: "Editor-managed content", body: "New stories are published from the WordPress dashboard." },
      { id: "reading", title: "Responsive reading", body: "Article pages and section navigation are laid out for mobile as well as desktop." },
    ],
  },
  relatedIds: ["browse-my-vacation", "commiters", "ai-summarizer"],
};
