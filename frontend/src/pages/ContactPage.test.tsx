import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ContactPage from "./ContactPage";
import { createLead } from "../lib/api";
import {
  buildOfficeMapDirectionsUrl,
  buildOfficeMapEmbedUrl,
  buildOfficeMapOpenUrl,
} from "../lib/officeMap";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("../lib/api", () => ({
  createLead: vi.fn(),
}));

describe("ContactPage", () => {
  beforeEach(() => {
    navigateMock.mockReset();
    vi.mocked(createLead).mockReset();
    vi.mocked(createLead).mockResolvedValue(undefined);
  });

  it("uses the immersive page hero shell", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-hero-premium")).toHaveClass("premium-hero", "premium-hero--immersive");
    expect(screen.getByRole("heading", { name: /Contact/i })).toBeInTheDocument();
  });

  it("prioritizes the inquiry form with a refined layout shell", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    const send = screen.getByRole("button", { name: /Send Message/i });
    expect(send).toBeInTheDocument();
    expect(send).toHaveClass("btn", "btn-minimal", "btn-minimal--solid");
    expect(send.closest(".form-actions")).toHaveClass("form-actions", "form-actions--start");
    expect(screen.getByTestId("contact-layout")).toHaveClass("contact-page-stack", "mobile-safe-layout");
    expect(screen.queryByTestId("project-fit-checklist")).not.toBeInTheDocument();
    expect(screen.queryByText(/Response within 24 hours/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Business goals and expected outcome/i)).not.toBeInTheDocument();
  });

  it("captures structured lead fields aligned with INR budget labelling", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/^Service$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Budget range \(₹\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Timeline$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Reference Links$/i)).toBeInTheDocument();
  });

  it("does not show inline helper lines under Name, Budget, or Timeline", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/Letters only — spaces, hyphens, and apostrophes are ok/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Digits and commas only — e\.g\. 50,000 or 1,50,000/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Letters, numbers, spaces, and hyphens — e\.g\. 4-8 weeks/i)).not.toBeInTheDocument();
  });

  it("anchors phone, email, and address with icons on the left; map alone on the right", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("contact-bottom")).toHaveClass("contact-bottom-split");
    expect(screen.getByTestId("contact-bottom-left")).toBeInTheDocument();
    expect(screen.getByTestId("contact-bottom-right")).toBeInTheDocument();
    const strip = screen.getByTestId("contact-strip");
    expect(strip).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /WhatsApp/i })).not.toBeInTheDocument();
    expect(within(strip).queryByText(/^Email$/i)).not.toBeInTheDocument();
    expect(within(strip).queryByText(/^Phone$/i)).not.toBeInTheDocument();
    expect(within(strip).queryByText(/^Studio$/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /\+91 7891646568/i })).toHaveAttribute("href", "tel:+917891646568");
    expect(screen.getByRole("link", { name: /hello@commiters.com/i })).toHaveAttribute("href", "mailto:hello@commiters.com");
    expect(screen.getByRole("link", { name: /commitersudaipur@gmail.com/i })).toHaveAttribute(
      "href",
      "mailto:commitersudaipur@gmail.com",
    );
    expect(screen.getByTitle(/office location map/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Open in Google Maps/i })).toBeInTheDocument();
    expect(screen.getByText(/82, Sobhagya Nagar, Nakoda Nagar, Udaipur, Rajasthan, India 313001/i)).toBeInTheDocument();
    expect(screen.getByTestId("contact-bottom-left")).toContainElement(
      screen.getByText(/82, Sobhagya Nagar, Nakoda Nagar, Udaipur, Rajasthan, India 313001/i),
    );
  });

  it("shows full office address without redundant checklist bullets", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/82, Sobhagya Nagar, Nakoda Nagar, Udaipur, Rajasthan, India 313001/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Get Directions/i })).toHaveClass("quote-link", "typography-link");
  });

  it("pins Google Maps open link, directions, and embed on geocoded coordinates", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /Open in Google Maps/i })).toHaveAttribute(
      "href",
      buildOfficeMapOpenUrl(),
    );
    expect(screen.getByRole("link", { name: /Get Directions/i })).toHaveAttribute(
      "href",
      buildOfficeMapDirectionsUrl(),
    );
    expect(screen.getByTitle(/office location map/i)).toHaveAttribute("src", buildOfficeMapEmbedUrl());
  });

  it("uses typography links for both Google Maps actions (no button styling)", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    const openMaps = screen.getByRole("link", { name: /Open in Google Maps/i });
    const directions = screen.getByRole("link", { name: /Get Directions/i });
    expect(openMaps).toHaveClass("quote-link", "typography-link");
    expect(directions).toHaveClass("quote-link", "typography-link");
    expect(openMaps).not.toHaveClass("btn");
    expect(directions).not.toHaveClass("btn");
  });

  it("sanitizes name input to letters and allowed punctuation only", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    const name = screen.getByLabelText(/^Name$/i);
    await user.clear(name);
    await user.type(name, "Jane123 Doe@");
    expect(name).toHaveValue("Jane Doe");
  });

  it("sanitizes budget input to digits and commas (₹-style amounts)", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    const budget = screen.getByLabelText(/Budget range \(₹\)/i);
    await user.type(budget, "₹50k and change");
    expect(budget).toHaveValue("50");
  });

  it("sanitizes timeline input to letters, numbers, spaces, and hyphens", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    const timeline = screen.getByLabelText(/^Timeline$/i);
    await user.type(timeline, "4@8 weeks!!!");
    expect(timeline).toHaveValue("48 weeks");
  });

  it("blocks submit when budget is comma-only", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/^Name$/i), "Nitesh Rav");
    await user.type(screen.getByLabelText(/^Email$/i), "hello@example.com");
    await user.type(screen.getByLabelText(/Budget range \(₹\)/i), ",,,");
    await user.type(screen.getByLabelText(/^Message$/i), "Need a site.");

    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/digit/i);
    expect(vi.mocked(createLead)).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("submits a valid inquiry and navigates to thank-you", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/^Name$/i), "Nitesh Rav");
    await user.type(screen.getByLabelText(/^Email$/i), "hello@example.com");
    await user.type(screen.getByLabelText(/Budget range \(₹\)/i), "50,000");
    await user.type(screen.getByLabelText(/^Timeline$/i), "4-8 weeks");
    await user.type(screen.getByLabelText(/^Message$/i), "Need a modern website.");

    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(vi.mocked(createLead)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(createLead)).toHaveBeenCalledWith({
      name: "Nitesh Rav",
      email: "hello@example.com",
      serviceNeeded: "Website Development",
      budgetRange: "50,000",
      timeline: "4-8 weeks",
      referenceLinks: undefined,
      message: "Need a modern website.",
    });
    expect(navigateMock).toHaveBeenCalledWith("/thank-you");
  });
});
