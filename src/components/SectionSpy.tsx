"use client";

import { useSection } from "@/contexts/SectionContext";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

const SECTION_IDS = ["home", "work", "about"];

export function SectionSpy({ children }: { children: ReactNode }) {
  const { setActiveSectionId } = useSection();
  const setterRef = useRef(setActiveSectionId);
  setterRef.current = setActiveSectionId;

  const rafRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  // Reset scroll to top before paint on mount/refresh so the page doesn’t appear slightly scrolled
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const scrollEl = document.getElementById("scroll-container");
    if (scrollEl) scrollEl.scrollTop = 0;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const scrollEl = document.getElementById("scroll-container");
    if (!scrollEl) return;

    const el = scrollEl;

    function updateHash() {
      const sections = SECTION_IDS.map((id) => ({
        id,
        el: document.getElementById(id),
      })).filter((s) => s.el) as { id: string; el: HTMLElement }[];

      const scrollTop = el.scrollTop;
      const containerHeight = el.clientHeight;
      const viewportMid = scrollTop + containerHeight / 2;

      let current: string | null = null;
      for (const { id, el: sectionEl } of sections) {
        const top = scrollTop + (sectionEl.getBoundingClientRect().top - el.getBoundingClientRect().top);
        const bottom = top + sectionEl.offsetHeight;
        if (viewportMid >= top && viewportMid < bottom) {
          current = id;
          break;
        }
      }
      if (!current && sections.length) {
        const firstTop = scrollTop + (sections[0].el.getBoundingClientRect().top - el.getBoundingClientRect().top);
        current = viewportMid < firstTop ? sections[0].id : sections[sections.length - 1].id;
      }
      if (current) {
        setterRef.current(current);
        if (window.location.hash.slice(1) !== current) {
          window.history.replaceState(null, "", `#${current}`);
        }
      }
      tickingRef.current = false;
    }

    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        updateHash();
      });
    }

    updateHash();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <>{children}</>;
}
