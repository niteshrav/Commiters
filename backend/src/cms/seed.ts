import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectMongo, disconnectMongo } from "./config/database";
import {
  AboutSection,
  ContactSettings,
  Footer,
  Faq,
  HeroSection,
  JobPosition,
  Navbar,
  Project,
  Service,
  TeamMember,
  Testimonial,
  User,
  WebsiteSettings,
} from "./models";

async function seed() {
  const connected = await connectMongo();
  if (!connected) {
    console.error("Cannot seed without MONGODB_URI.");
    process.exit(1);
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim() || "admin@commiters.com";
  const adminPassword = process.env.ADMIN_PASSWORD?.trim() || "ChangeMe123!";
  const adminName = process.env.ADMIN_NAME?.trim() || "Commiters Admin";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      name: adminName,
      role: "admin",
    });
    console.log(`Created admin user: ${adminEmail}`);
  }

  if ((await HeroSection.countDocuments()) === 0) {
    await HeroSection.create({
      badgeText: "ENGINEERING PRECISION",
      heading: "Code Your Success",
      description:
        "We transform complex architectural challenges into scalable, production-ready systems. Founder-led engineering for high-stakes digital products.",
      heroImage: "/assets/home/home-hero-monitor.png",
      primaryButtonLabel: "Our Work",
      primaryButtonUrl: "/case-studies",
      secondaryButtonLabel: "Meet Our Team",
      secondaryButtonUrl: "/about",
      sprintLabel: "CURRENT SPRINT",
      sprintValue: "v2.4.0 Engine",
      isActive: true,
    });
  }

  if ((await Navbar.countDocuments()) === 0) {
    await Navbar.create({
      logo: "/assets/commiters-header-logo.png",
      logoAlt: "Commiters — Commit. Code. Connect.",
      navLinks: [
        { label: "Home", url: "/", order: 1 },
        { label: "About", url: "/about", order: 2 },
        { label: "Services", url: "/services", order: 3 },
        { label: "Our Work", url: "/case-studies", order: 4 },
        { label: "Technical Ledger", url: "/technical-ledger", order: 5 },
        { label: "Join Us", url: "/join-us", order: 6 },
        { label: "Contact", url: "/contact", order: 7 },
      ],
      ctaLabel: "Start Project",
      ctaUrl: "/contact",
      isActive: true,
    });
  } else {
    const navbarDoc = await Navbar.findOne({ isActive: true }).sort({ updatedAt: -1 });
    if (navbarDoc) {
      const placeholderLogos = new Set([
        "",
        "/assets/icons/favicon.svg",
        "/assets/icons/favicon.png",
        "/assets/icons/favicon-16x16.png",
        "/assets/icons/favicon-32x32.png",
      ]);
      if (placeholderLogos.has(navbarDoc.logo)) {
        navbarDoc.logo = "/assets/commiters-header-logo.png";
        navbarDoc.logoAlt = "Commiters — Commit. Code. Connect.";
        await navbarDoc.save();
      }
    }
  }

  if ((await AboutSection.countDocuments()) === 0) {
    await AboutSection.create({
      heading: "We build the invisible architecture that powers digital leaders.",
      description:
        "Commiters is a boutique engineering studio founded on the principle that code should be as elegant as it is robust.",
      mission: "Translate complex business logic into scalable digital reality.",
      vision:
        "Founded by Nitesh Rav, Commiters emerged from a decade of high-stakes engineering in global tech hubs.",
      images: ["/assets/about/nitesh-rav-founder.png"],
      statistics: [{ value: "13+", label: "Years Experience" }],
      isActive: true,
    });
  }

  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany([
      { icon: "website", title: "Website Development", description: "High-performance marketing sites.", order: 1, isActive: true },
      { icon: "webapp", title: "Web Application Development", description: "Scalable SaaS platforms.", order: 2, isActive: true },
      { icon: "mobile", title: "Mobile App Development", description: "Native and cross-platform apps.", order: 3, isActive: true },
      { icon: "ecommerce", title: "E-commerce Development", description: "Conversion-focused storefronts.", order: 4, isActive: true },
      { icon: "automation", title: "Automation Tools", description: "Workflow and integration tooling.", order: 5, isActive: true },
      { icon: "ai", title: "AI Integration", description: "LLM and AI product features.", order: 6, isActive: true },
      { icon: "mvp", title: "MVP Development", description: "Fast founder-led MVP delivery.", order: 7, isActive: true },
    ]);
  }

  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      {
        name: "Commiters.com",
        category: "Web Platform",
        description: "Founder-led engineering studio website.",
        images: [],
        technologies: ["React", "Node.js", "Express"],
        projectUrl: "/case-studies/commiters",
        isFeatured: true,
        isActive: true,
        order: 1,
      },
      {
        name: "AI Summarizer",
        category: "AI Product",
        description: "Document summarization POC.",
        images: [],
        technologies: ["Python", "OpenAI"],
        projectUrl: "/case-studies/ai-summarizer",
        isFeatured: true,
        isActive: true,
        order: 2,
      },
    ]);
  }

  if ((await Testimonial.countDocuments()) === 0) {
    await Testimonial.insertMany([
      {
        clientName: "Arjun Kumar",
        company: "India",
        review: "Commiters delivered our MVP ahead of schedule with exceptional code quality.",
        rating: 5,
        photo: "",
        order: 1,
        isActive: true,
      },
      {
        clientName: "Sarah Reynolds",
        company: "UK",
        review: "Founder-led delivery meant zero miscommunication. Highly recommended.",
        rating: 5,
        photo: "",
        order: 2,
        isActive: true,
      },
    ]);
  }

  if ((await TeamMember.countDocuments()) === 0) {
    await TeamMember.create({
      name: "Nitesh Rav",
      designation: "Founder & Lead Engineer",
      bio: "Architecting scalable systems for high-stakes digital products.",
      image: "/assets/about/nitesh-rav-founder.png",
      linkedin: "https://www.linkedin.com/company/commiters",
      github: "",
      order: 1,
      isActive: true,
    });
  }

  if ((await JobPosition.countDocuments()) === 0) {
    await JobPosition.insertMany([
      { title: "Full Stack Engineer", description: "Build production web applications.", requirements: ["React", "Node.js"], location: "Udaipur / Remote", status: "open", order: 1 },
      { title: "AI Engineer", description: "Integrate LLM features into products.", requirements: ["Python", "OpenAI"], location: "Udaipur / Remote", status: "open", order: 2 },
    ]);
  }

  if ((await ContactSettings.countDocuments()) === 0) {
    await ContactSettings.create({
      companyName: "Commiters",
      address: "Udaipur, Rajasthan, India",
      email: "hello@commiters.com, commitersudaipur@gmail.com",
      phone: "+91 9024882899",
      googleMapEmbedUrl: "",
      googleMapDirectionsUrl: "",
      socialLinks: [
        { platform: "LinkedIn", url: "https://www.linkedin.com/company/commiters" },
        { platform: "WhatsApp", url: "https://wa.me/919024882899" },
      ],
    });
  }

  if ((await Footer.countDocuments()) === 0) {
    await Footer.create({
      logo: "/assets/commiters-header-logo.png",
      description: "Commit. Code. Connect.",
      copyright: "© Commiters. All rights reserved.",
      socialLinks: [
        { platform: "LinkedIn", url: "https://www.linkedin.com/company/commiters-softwares/?viewAsMember=true" },
        { platform: "WhatsApp", url: "https://wa.me/919024882899" },
        { platform: "Instagram", url: "https://www.instagram.com/commitersconnect/" },
        { platform: "Medium", url: "https://medium.com/@erniteshrav" },
      ],
      quickLinks: [],
      navigationLinks: [
        { label: "Home", url: "/", order: 1 },
        { label: "About", url: "/about", order: 2 },
        { label: "Our Work", url: "/case-studies", order: 3 },
        { label: "Technical Ledger", url: "/technical-ledger", order: 4 },
        { label: "Services", url: "/services", order: 5 },
        { label: "Join Us", url: "/join-us", order: 6 },
        { label: "FAQ", url: "/faq", order: 7 },
        { label: "Contact", url: "/contact", order: 8 },
      ],
      legalLinks: [
        { label: "Privacy", url: "/privacy-policy", order: 1 },
        { label: "Cookies", url: "/cookie-policy", order: 2 },
        { label: "Terms", url: "/terms", order: 3 },
      ],
    });
  } else {
    const footerDoc = await Footer.findOne().sort({ updatedAt: -1 });
    if (footerDoc) {
      const requiredSocial = [
        { platform: "LinkedIn", url: "https://www.linkedin.com/company/commiters-softwares/?viewAsMember=true" },
        { platform: "WhatsApp", url: "https://wa.me/919024882899" },
        { platform: "Instagram", url: "https://www.instagram.com/commitersconnect/" },
        { platform: "Medium", url: "https://medium.com/@erniteshrav" },
      ];
      const current = footerDoc.socialLinks ?? [];
      const merged = [...current];
      for (const link of requiredSocial) {
        if (!merged.some((row) => row.platform.toLowerCase() === link.platform.toLowerCase())) {
          merged.push(link);
        }
      }
      if (merged.length !== current.length) {
        footerDoc.socialLinks = merged;
        await footerDoc.save();
      }

      const requiredNavigation = [
        { label: "Home", url: "/", order: 1 },
        { label: "About", url: "/about", order: 2 },
        { label: "Our Work", url: "/case-studies", order: 3 },
        { label: "Technical Ledger", url: "/technical-ledger", order: 4 },
        { label: "Services", url: "/services", order: 5 },
        { label: "Join Us", url: "/join-us", order: 6 },
        { label: "FAQ", url: "/faq", order: 7 },
        { label: "Contact", url: "/contact", order: 8 },
      ];
      const currentNavigation = footerDoc.navigationLinks ?? [];
      const mergedNavigation = [...currentNavigation];
      for (const link of requiredNavigation) {
        if (!mergedNavigation.some((row) => row.label.toLowerCase() === link.label.toLowerCase())) {
          mergedNavigation.push(link);
        }
      }
      if (mergedNavigation.length !== currentNavigation.length) {
        footerDoc.navigationLinks = mergedNavigation.sort((a, b) => a.order - b.order);
        await footerDoc.save();
      }

      const requiredLegal = [
        { label: "Privacy", url: "/privacy-policy", order: 1 },
        { label: "Cookies", url: "/cookie-policy", order: 2 },
        { label: "Terms", url: "/terms", order: 3 },
      ];
      const currentLegal = footerDoc.legalLinks ?? [];
      const mergedLegal = [...currentLegal];
      for (const link of requiredLegal) {
        if (!mergedLegal.some((row) => row.label.toLowerCase() === link.label.toLowerCase())) {
          mergedLegal.push(link);
        }
      }
      if (mergedLegal.length !== currentLegal.length) {
        footerDoc.legalLinks = mergedLegal.sort((a, b) => a.order - b.order);
        await footerDoc.save();
      }
    }
  }

  if ((await WebsiteSettings.countDocuments()) === 0) {
    await WebsiteSettings.create({
      websiteName: "Commiters",
      seoTitle: "Commiters | Founder-Led Engineering Studio",
      metaDescription: "Commiters builds scalable web, mobile, AI, and MVP products with founder-led delivery.",
      favicon: "/assets/icons/favicon.svg",
      openGraphImage: "",
    });
  }

  if ((await Faq.countDocuments()) === 0) {
    await Faq.insertMany([
      {
        category: "process",
        order: 1,
        question: "How do you handle project timelines and milestones?",
        answer:
          "We operate on two-week sprint cycles with clear deliverables at the end of each. Our process starts with a rigorous discovery phase, followed by architecture design, development, and weekly syncs to ensure we stay on track with your roadmap.",
      },
      {
        category: "process",
        order: 2,
        question: "What does the handoff process look like?",
        answer:
          "Handoff is not a single event but a continuous process. We provide full source code ownership, comprehensive technical documentation, and CI/CD pipeline setups. We also offer a 30-day post-launch support window to ensure a smooth transition.",
      },
      {
        category: "technical",
        order: 1,
        question: "What is your primary technology stack?",
        answer:
          "While we are tech-agnostic based on project needs, our core expertise lies in TypeScript, React, Node.js, Rust, and Go. We leverage AWS and GCP for scalable cloud infrastructure and Kubernetes for container orchestration.",
      },
      {
        category: "technical",
        order: 2,
        question: "How do you ensure the security of our application?",
        answer:
          "Security is baked into our SDLC. We perform regular code audits, implement OWASP top 10 best practices, and use automated dependency scanning. For high-stakes projects, we coordinate with third-party penetration testing firms.",
      },
      {
        category: "engagements",
        order: 1,
        question: "How do you structure your pricing?",
        answer:
          "We typically work on a time-and-materials basis for agile development, or fixed-fee for well-defined discovery phases. We provide transparent weekly burn reports so you always know where your budget is going.",
      },
      {
        category: "engagements",
        order: 2,
        question: "Do you sign NDAs before initial discussions?",
        answer:
          "Absolutely. We understand the sensitivity of intellectual property. We are happy to sign your standard NDA or provide our own Mutual Non-Disclosure Agreement before diving into the details of your project.",
      },
    ]);
  }

  console.log("CMS seed completed.");
  await disconnectMongo();
}

seed().catch(async (error) => {
  console.error(error);
  await disconnectMongo();
  process.exit(1);
});
