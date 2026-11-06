import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Layout from "../components/Layout";
import { HOME_DEMO_COPY } from "../lib/homeDemoContent";
import { NAV_CTA_LABEL } from "../lib/navSections";

describe("HomePage", () => {
  it("renders the demo home sections without the previous OpsFlow magnet", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("home-page");
    expect(within(page).getByTestId("home-demo-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: HOME_DEMO_COPY.hero.title })).toBeInTheDocument();
    expect(screen.getByText(HOME_DEMO_COPY.problems.title)).toBeInTheDocument();
    expect(screen.getByText(HOME_DEMO_COPY.finder.title)).toBeInTheDocument();
    expect(screen.getByTestId("home-demo-finder")).toHaveAttribute("id", HOME_DEMO_COPY.finder.id);
    expect(document.getElementById(HOME_DEMO_COPY.finder.legacyId)).toBeTruthy();
    expect(screen.queryByTestId("stitch-home-hero")).not.toBeInTheDocument();
    expect(screen.queryByTestId("home-lead-magnet")).not.toBeInTheDocument();
    expect(screen.queryByText("Code Your Success")).not.toBeInTheDocument();
  });

  it("links hero actions to solutions and the work section", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const actions = screen.getByTestId("home-demo-hero-actions");
    expect(within(actions).getByRole("link", { name: /Find your system/i })).toHaveAttribute(
      "href",
      HOME_DEMO_COPY.hero.primaryHref,
    );
    expect(within(actions).getByRole("link", { name: HOME_DEMO_COPY.hero.secondaryCta })).toHaveAttribute(
      "href",
      HOME_DEMO_COPY.hero.secondaryHref,
    );
  });

  it("advances the project planner after a type is selected", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /Custom software/i }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByRole("heading", { name: "Confirm the project details" })).toBeInTheDocument();
  });

  it("shows one homepage service at a time in the full-width carousel", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const carousel = screen.getByTestId("home-service-carousel");
    expect(within(carousel).getByTestId("home-service-counter")).toHaveTextContent("1 of 6 Services");
    expect(within(carousel).getByTestId("home-service-slide-websites")).toHaveAttribute("data-active", "true");
    expect(within(carousel).getByTestId("home-service-slide-software")).toHaveAttribute("data-active", "false");
    expect(within(carousel).getAllByTestId(/home-service-slide-/)).toHaveLength(6);

    await user.click(screen.getByRole("button", { name: HOME_DEMO_COPY.servicesCarousel.nextLabel }));
    expect(within(carousel).getByTestId("home-service-counter")).toHaveTextContent("2 of 6 Services");
    expect(within(carousel).getByTestId("home-service-slide-software")).toHaveAttribute("data-active", "true");
    expect(within(carousel).getByTestId("home-service-slide-websites")).toHaveAttribute("data-active", "false");
    expect(within(carousel).getByTestId("home-service-slide-software").parentElement).toHaveStyle({
      transform: `translateX(-${(100 / 6)}%)`,
    });

    await user.click(screen.getByRole("tab", { name: "Show Mobile Applications" }));
    expect(within(carousel).getByTestId("home-service-counter")).toHaveTextContent("5 of 6 Services");
    expect(within(carousel).getByTestId("home-service-slide-mobile")).toHaveAttribute("data-active", "true");
  });

  it("keeps the production header and footer when the demo home is shown", () => {
    render(
      <MemoryRouter>
        <Layout>
          <HomePage />
        </Layout>
      </MemoryRouter>,
    );

    const header = screen.getByRole("banner");
    const footer = screen.getByRole("contentinfo");
    expect(within(header).getByRole("navigation", { name: /Primary navigation/i })).toBeInTheDocument();
    expect(within(header).getByRole("link", { name: /^Prooflyn$/i })).toBeInTheDocument();
    expect(within(header).getByRole("link", { name: NAV_CTA_LABEL })).toBeInTheDocument();
    expect(screen.queryByText(/ENGINEERING WITH PURPOSE/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Homepage concept preview/i)).not.toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^Prooflyn$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^Testimonials$/i })).toBeInTheDocument();
  });
});
