import { describe, expect, it } from "vitest";
import {
  BROWSE_MY_VACATION_TESTIMONIAL,
  TESTIMONIALS_PAGE_COPY,
  TESTIMONIALS_PAGE_ITEMS,
} from "./testimonialsPageContent";

describe("testimonialsPageContent", () => {
  it("includes the BrowseMyVacation testimonial from Rahul", () => {
    expect(BROWSE_MY_VACATION_TESTIMONIAL.name).toBe("Rahul");
    expect(BROWSE_MY_VACATION_TESTIMONIAL.company).toContain("BrowseMyVacation");
    expect(BROWSE_MY_VACATION_TESTIMONIAL.quote).toContain("BrowseMyVacation");
    expect(BROWSE_MY_VACATION_TESTIMONIAL.quote).toContain("top-tier web applications");
  });

  it("lists only the BrowseMyVacation testimonial on the page", () => {
    expect(TESTIMONIALS_PAGE_ITEMS).toEqual([BROWSE_MY_VACATION_TESTIMONIAL]);
  });

  it("exposes page intro copy", () => {
    expect(TESTIMONIALS_PAGE_COPY.title).toBe("Client Testimonials");
  });
});
