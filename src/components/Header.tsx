"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSection } from "@/contexts/SectionContext";

const navLinks = [
  { href: "#home", id: "home", label: "Home" },
  { href: "#work", id: "work", label: "Work" },
  { href: "#credo", id: "credo", label: "Credo" },
  { href: "mailto:design@rahulsrinivas.com", id: "contact-link", label: "Contact" },
] as const;

const baseLinkClass =
  "min-h-touch min-w-[4.5rem] inline-flex items-center justify-center rounded-full px-lg py-2 text-body font-normal transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function Header() {
  const { activeSectionId } = useSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDark =
    pathname.startsWith("/nasa") ||
    pathname.startsWith("/flux") ||
    pathname.startsWith("/challenge-visuals") ||
    pathname.startsWith("/findings-visuals");
  const isHomePage = pathname === "/";

  function closeMenu() {
    setMenuOpen(false);
  }

  function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    if (!isHomePage) return;
    e.preventDefault();
    const id = href.slice(1);
    const container = document.getElementById("scroll-container");
    const target = document.getElementById(id);
    if (!container) return;
    if (!target) {
      container.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const containerTop = container.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    container.scrollBy({ top: targetTop - containerTop, behavior: "smooth" });
  }

  const pillClass = isDark
    ? "bg-black/55 backdrop-blur-xl rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_18px_60px_rgba(0,0,0,0.45)]"
    : "glass-pill";
  const activeClass = isDark
    ? "bg-white/20 text-white focus-visible:outline-white"
    : "glass-pill-active text-foreground-primary";
  const inactiveClass = isDark
    ? "bg-transparent text-white/70 hover:text-white focus-visible:outline-white"
    : "bg-transparent text-foreground-secondary hover:bg-transparent hover:text-foreground-primary";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-lg">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-sm px-xs lg:px-sm font-sans">
        <div className="min-w-0" />
        <nav className="hidden md:flex md:justify-center" aria-label="Main">
          <ul
            className={`${pillClass} flex items-center gap-0 rounded-full px-1 py-1 list-none m-0`}
            role="list"
          >
            {navLinks.map(({ href, id, label }) => {
              const isActive = activeSectionId === id;
              const linkHref = !isHomePage && href.startsWith("#") ? `/${href}` : href;
              return (
                <li key={id}>
                  <a
                    href={linkHref}
                    onClick={(e) => scrollToSection(e, href)}
                    className={`${baseLinkClass} ${
                      isActive ? activeClass : inactiveClass
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-sm min-w-0">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`${pillClass} flex md:hidden min-h-touch min-w-touch items-center justify-center rounded-full p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isDark ? "text-white focus-visible:outline-white" : "text-foreground-primary focus-visible:outline-accent"
            }`}
          >
            {menuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="absolute left-0 right-0 top-full mt-2 px-xs md:hidden"
          role="dialog"
          aria-label="Navigation menu"
        >
          <ul
            className={`${pillClass} flex flex-col rounded-2xl p-2 list-none m-0`}
            role="list"
          >
            {navLinks.map(({ href, id, label }) => {
              const isActive = activeSectionId === id;
              const linkHref = !isHomePage && href.startsWith("#") ? `/${href}` : href;
              return (
                <li key={id}>
                  <a
                    href={linkHref}
                    onClick={(e) => { scrollToSection(e, href); closeMenu(); }}
                    className={`${baseLinkClass} justify-start w-full rounded-xl ${
                      isActive ? activeClass : inactiveClass
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
