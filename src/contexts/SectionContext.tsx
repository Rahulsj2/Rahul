"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const SECTION_IDS = ["home", "work", "credo", "contact"];

type SectionContextValue = {
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
};

const SectionContext = createContext<SectionContextValue | null>(null);

function getInitialSectionId() {
  if (typeof window === "undefined") return "home";

  const { pathname, hash } = window.location;

  // Route-based defaults
  if (pathname.startsWith("/nasa")) {
    return "work";
  }

  // Hash-based defaults on the main page
  const id = hash.slice(1);
  return SECTION_IDS.includes(id) ? id : "home";
}

export function SectionProvider({ children }: { children: ReactNode }) {
  const [activeSectionId, setActiveSectionId] = useState("home");

  useEffect(() => {
    setActiveSectionId(getInitialSectionId());
  }, []);

  return (
    <SectionContext.Provider value={{ activeSectionId, setActiveSectionId }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error("useSection must be used within SectionProvider");
  return ctx;
}
