import { useCallback, useEffect, useMemo, useState, type MouseEvent } from "react";
import {
  IconArrowRight,
  IconChartLine,
  IconChevronDown,
  IconCodeBracket,
  IconHandshake,
} from "./icons";
import { useFaqPageContent } from "../lib/cms/faq";
import type { FaqCategoryId } from "../lib/faqPageContent";
import { FAQ_PAGE_COPY } from "../lib/faqPageContent";
import {
  FAQ_ACCORDION_CHEVRON_CLASS,
  FAQ_ACCORDION_ITEM_CLASS,
  FAQ_ACCORDION_ITEM_OPEN_CLASS,
  FAQ_ACCORDION_LIST_CLASS,
  FAQ_ACCORDION_PANEL_CLASS,
  FAQ_ACCORDION_TRIGGER_CLASS,
  FAQ_CATEGORY_CLASS,
  FAQ_CATEGORY_TITLE_CLASS,
  FAQ_CONTENT_GRID_CLASS,
  FAQ_CONTENT_SECTION_CLASS,
  FAQ_MAIN_CLASS,
  FAQ_SIDEBAR_CLASS,
  FAQ_SIDEBAR_LABEL_CLASS,
  FAQ_SIDEBAR_LINK_ACTIVE_CLASS,
  FAQ_SIDEBAR_LINK_CLASS,
} from "../lib/faqPageLayout";

const CATEGORY_ICONS: Record<FaqCategoryId, typeof IconChartLine> = {
  process: IconChartLine,
  technical: IconCodeBracket,
  engagements: IconHandshake,
};

const HEADER_OFFSET_PX = 120;

function scrollToCategory(anchor: string) {
  const target = document.getElementById(anchor);
  if (!target) return;
  window.scrollTo({
    top: target.offsetTop - HEADER_OFFSET_PX,
    behavior: "smooth",
  });
}

export default function FaqContentSection() {
  const { groups } = useFaqPageContent();
  const firstCategoryId = groups[0]?.id ?? "process";
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId>(firstCategoryId);
  const [openItemIds, setOpenItemIds] = useState<Record<string, string | null>>(() => {
    const initial: Record<string, string | null> = {};
    for (const group of groups) {
      initial[group.id] = group.items[0]?.id ?? null;
    }
    return initial;
  });

  const visibleGroups = useMemo(() => groups.filter((group) => group.items.length > 0), [groups]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const matched = visibleGroups.find((group) => group.anchor === hash);
    if (!matched) return;
    setActiveCategory(matched.id);
    requestAnimationFrame(() => scrollToCategory(matched.anchor));
  }, [visibleGroups]);

  const handleSidebarClick = useCallback(
    (categoryId: FaqCategoryId, anchor: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setActiveCategory(categoryId);
      scrollToCategory(anchor);
    },
    [],
  );

  const toggleItem = useCallback((categoryId: FaqCategoryId, itemId: string) => {
    setOpenItemIds((current) => ({
      ...current,
      [categoryId]: current[categoryId] === itemId ? null : itemId,
    }));
  }, []);

  return (
    <section className={FAQ_CONTENT_SECTION_CLASS} data-testid="faq-content-section">
      <div className="container">
        <div className={FAQ_CONTENT_GRID_CLASS}>
          <aside className={FAQ_SIDEBAR_CLASS} aria-label="FAQ categories">
            <h2 className={FAQ_SIDEBAR_LABEL_CLASS}>{FAQ_PAGE_COPY.categoriesLabel}</h2>
            <nav className="faq-sidebar-nav">
              {visibleGroups.map((group) => {
                const isActive = activeCategory === group.id;
                return (
                  <a
                    key={group.id}
                    className={`${FAQ_SIDEBAR_LINK_CLASS}${isActive ? ` ${FAQ_SIDEBAR_LINK_ACTIVE_CLASS}` : ""}`}
                    href={`#${group.anchor}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={handleSidebarClick(group.id, group.anchor)}
                  >
                    <span>{group.label}</span>
                    <IconArrowRight
                      className="faq-sidebar-link-icon"
                      width={18}
                      height={18}
                      aria-hidden
                    />
                  </a>
                );
              })}
            </nav>
          </aside>

          <div className={FAQ_MAIN_CLASS}>
            {visibleGroups.map((group, groupIndex) => {
              const CategoryIcon = CATEGORY_ICONS[group.id];
              return (
                <section
                  key={group.id}
                  id={group.anchor}
                  className={`${FAQ_CATEGORY_CLASS}${groupIndex > 0 ? " faq-category--spaced" : ""}`}
                  data-testid={`faq-category-${group.id}`}
                  aria-labelledby={`faq-category-title-${group.id}`}
                >
                  <h2 id={`faq-category-title-${group.id}`} className={FAQ_CATEGORY_TITLE_CLASS}>
                    <CategoryIcon width={22} height={22} aria-hidden />
                    {group.label}
                  </h2>
                  <div className={FAQ_ACCORDION_LIST_CLASS}>
                    {group.items.map((item) => {
                      const isOpen = openItemIds[group.id] === item.id;
                      return (
                        <article
                          key={item.id}
                          className={`${FAQ_ACCORDION_ITEM_CLASS}${isOpen ? ` ${FAQ_ACCORDION_ITEM_OPEN_CLASS}` : ""}`}
                          data-testid={`faq-item-${item.id}`}
                        >
                          <button
                            type="button"
                            className={FAQ_ACCORDION_TRIGGER_CLASS}
                            aria-expanded={isOpen}
                            onClick={() => toggleItem(group.id, item.id)}
                          >
                            <span>{item.question}</span>
                            <IconChevronDown
                              className={FAQ_ACCORDION_CHEVRON_CLASS}
                              width={22}
                              height={22}
                              aria-hidden
                            />
                          </button>
                          <div className={FAQ_ACCORDION_PANEL_CLASS}>
                            <p>{item.answer}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
