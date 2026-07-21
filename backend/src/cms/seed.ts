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
        { label: "Open Positions", url: "/open-positions", order: 6 },
        { label: "Join Us", url: "/join-us", order: 7 },
        { label: "Contact", url: "/contact", order: 8 },
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

      const legacyJobPaths = new Set(["/open-position", "/job-positions", "/job-position"]);
      const desiredNavOrder: Record<string, number> = {
        "/": 1,
        "/about": 2,
        "/services": 3,
        "/case-studies": 4,
        "/technical-ledger": 5,
        "/open-positions": 6,
        "/join-us": 7,
        "/contact": 8,
      };
      let navbarChanged = false;
      for (const link of navbarDoc.navLinks ?? []) {
        if (legacyJobPaths.has(link.url)) {
          link.url = "/open-positions";
          navbarChanged = true;
        }
        const nextOrder = desiredNavOrder[link.url];
        if (nextOrder !== undefined && link.order !== nextOrder) {
          link.order = nextOrder;
          navbarChanged = true;
        }
      }
      if (navbarChanged) {
        navbarDoc.navLinks = [...(navbarDoc.navLinks ?? [])].sort((a, b) => a.order - b.order);
        await navbarDoc.save();
        console.log("Updated navbar link order.");
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
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 3);

    await JobPosition.insertMany([
      {
        title: "Full Stack Engineer",
        slug: "full-stack-engineer",
        department: "Engineering",
        employmentType: "Full-time",
        experience: "2–5 years",
        location: "Udaipur / Remote",
        workMode: "Hybrid",
        duration: "Permanent",
        stipendSalary: "₹8–14 LPA",
        numberOfOpenings: 2,
        aboutCompany:
          "Commiters is a founder-led engineering studio helping startups ship production-ready web, mobile, and AI products.",
        roleOverview:
          "Build scalable full-stack features across React, Node.js, and MongoDB while collaborating directly with founders and product teams.",
        description:
          "Build scalable full-stack features across React, Node.js, and MongoDB while collaborating directly with founders and product teams.",
        responsibilities: [
          "Ship production features across frontend and backend",
          "Design REST APIs and data models",
          "Write clean, tested TypeScript code",
          "Collaborate on architecture and delivery planning",
        ],
        requiredSkills: ["React", "TypeScript", "Node.js", "MongoDB"],
        preferredSkills: ["Next.js", "Tailwind CSS", "AWS"],
        eligibility: "Bachelor's in CS or equivalent experience. Strong communication and ownership mindset.",
        benefits: ["Flexible work hours", "Learning budget", "Direct founder mentorship", "Remote-friendly culture"],
        learningOpportunities: "Work across MVPs, SaaS platforms, and AI integrations with senior engineers.",
        selectionProcess: "Application review → Technical screen → Practical assignment → Founder interview",
        lastDateToApply: futureDate,
        status: "open",
        featured: true,
        displayOrder: 1,
        requirements: ["React", "TypeScript", "Node.js", "MongoDB"],
        seo: {
          title: "Full Stack Engineer | Commiters Careers",
          description: "Join Commiters as a Full Stack Engineer building production web applications.",
        },
        createdBy: "seed",
        updatedBy: "seed",
      },
      {
        title: "AI Engineer Intern",
        slug: "ai-engineer-intern",
        department: "AI & Automation",
        employmentType: "Internship",
        internshipType: "Paid Internship",
        experience: "0–1 year",
        location: "Remote",
        workMode: "Remote",
        duration: "6 months",
        stipendSalary: "₹15,000 / month",
        numberOfOpenings: 3,
        aboutCompany:
          "Commiters integrates LLM and automation features into real products for founders and enterprise teams.",
        roleOverview:
          "Support AI feature development, prompt engineering, and integration of LLM APIs into production workflows.",
        description:
          "Support AI feature development, prompt engineering, and integration of LLM APIs into production workflows.",
        responsibilities: [
          "Prototype AI features with OpenAI and similar APIs",
          "Help evaluate prompts and model outputs",
          "Document integration patterns",
          "Pair with senior engineers on production tasks",
        ],
        requiredSkills: ["Python", "JavaScript", "APIs"],
        preferredSkills: ["LangChain", "RAG", "Vector databases"],
        eligibility: "Students or recent graduates passionate about applied AI.",
        benefits: ["Certificate of completion", "Mentorship", "Full-time conversion path"],
        learningOpportunities: "Hands-on experience shipping AI features in live client projects.",
        selectionProcess: "Resume review → Take-home task → Technical interview",
        lastDateToApply: futureDate,
        status: "open",
        featured: true,
        displayOrder: 2,
        requirements: ["Python", "JavaScript", "APIs"],
        seo: {
          title: "AI Engineer Intern | Commiters Careers",
          description: "Paid AI engineering internship at Commiters with real product exposure.",
        },
        createdBy: "seed",
        updatedBy: "seed",
      },
      {
        title: "Mobile App Developer",
        slug: "mobile-app-developer",
        department: "Mobile",
        employmentType: "Full-time",
        experience: "1–4 years",
        location: "Udaipur / Hybrid",
        workMode: "Hybrid",
        duration: "Permanent",
        stipendSalary: "₹6–12 LPA",
        numberOfOpenings: 1,
        aboutCompany: "Commiters delivers native and cross-platform mobile apps for startups and growing teams.",
        roleOverview: "Develop polished mobile experiences using React Native or Flutter with strong UX focus.",
        description: "Develop polished mobile experiences using React Native or Flutter with strong UX focus.",
        responsibilities: [
          "Build and maintain mobile app features",
          "Integrate REST APIs and auth flows",
          "Optimize performance and release builds",
          "Collaborate with designers on UI polish",
        ],
        requiredSkills: ["React Native", "TypeScript", "Mobile UI"],
        preferredSkills: ["Flutter", "Firebase", "App Store deployment"],
        eligibility: "Portfolio or shipped apps required.",
        benefits: ["Hybrid work", "Device allowance", "Skill development support"],
        learningOpportunities: "Exposure to MVP launches and production mobile releases.",
        selectionProcess: "Portfolio review → Live coding → Team fit interview",
        lastDateToApply: futureDate,
        status: "open",
        featured: false,
        displayOrder: 3,
        requirements: ["React Native", "TypeScript", "Mobile UI"],
        seo: {
          title: "Mobile App Developer | Commiters Careers",
          description: "Build mobile apps at Commiters with React Native and modern tooling.",
        },
        createdBy: "seed",
        updatedBy: "seed",
      },
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
