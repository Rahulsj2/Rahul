"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type IconProps = JSX.IntrinsicElements["svg"];

function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" />
    </svg>
  );
}

function ReplayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        d="M12 5V2L8 6l4 4V7a5 5 0 1 1-4.9 6H6a7 7 0 1 0 6-8z"
        fill="currentColor"
      />
    </svg>
  );
}

const CARD_WIDTH = 1260;
const GAP = 24;
const STEP = CARD_WIDTH + GAP;
// Desktop: used only for scrollToCard targets; layout is 78px spacer + 24px gap = 102 lead
const LEAD_OFFSET = 78 + GAP;
const GROUP_0_CENTER = LEAD_OFFSET + CARD_WIDTH / 2;
const GROUP_1_CENTER = LEAD_OFFSET + CARD_WIDTH + GAP + CARD_WIDTH / 2;
const GROUP_2_CENTER = LEAD_OFFSET + CARD_WIDTH + GAP + CARD_WIDTH + GAP + CARD_WIDTH / 2;
const DESKTOP_GROUP_COUNT = 3;
const MOBILE_CARD_COUNT = 4;
const DOT_SIZE = 8;
const PILL_WIDTH = 48;
const MARGIN_PX = 8;
const WIDTH_RANGE = PILL_WIDTH - DOT_SIZE; // 40
const AUTO_SCROLL_INTERVAL_MS = 4000;
const WORK2_CARD_COUNT = 3;

export function WorkScrollIndicator({
  variant = "work",
  hidePlayButton = false,
  darkTheme = false,
}: {
  variant?: "work" | "work2";
  hidePlayButton?: boolean;
  darkTheme?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [fillProgress, setFillProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fillStartTimeRef = useRef(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const scrollSelector = variant === "work2" ? ".work2-section-scroll" : ".work-section-scroll";
  const cardSelector = variant === "work2" ? ".work2-group" : ".work-group";
  const isWork2 = variant === "work2";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const scrollEl = document.querySelector(scrollSelector) as HTMLElement | null;
    const track = trackRef.current;
    if (!scrollEl || !track) return;

    function updateIndicators() {
      const scrollLeft = scrollEl.scrollLeft;
      const maxScrollLeft = scrollEl.scrollWidth - scrollEl.clientWidth;
      const atEnd = maxScrollLeft <= 0 || scrollLeft >= maxScrollLeft - 1;
      const viewportCenter = scrollLeft + scrollEl.clientWidth / 2;
      let baseIndex = 0;
      let progress = 0;
      let hasNext = false;
      const buttons = track.querySelectorAll<HTMLButtonElement>(".scroll-indicator-item");

      const scrollRect = scrollEl.getBoundingClientRect();
      function centerInScrollContent(el: HTMLElement) {
        const rect = el.getBoundingClientRect();
        return scrollLeft + (rect.left - scrollRect.left) + rect.width / 2;
      }

      const cards = Array.from(scrollEl.querySelectorAll<HTMLElement>(cardSelector));
      const threeItemCount = isWork2 ? WORK2_CARD_COUNT : DESKTOP_GROUP_COUNT;

      // Desktop with 3 groups: use progress-based pill/dot animation as you scroll
      if (isDesktop && cards.length === threeItemCount && !isWork2) {
        if (!cards.length || !buttons.length) {
          rafRef.current = null;
          return;
        }
        const groupCenters = cards.map((el) => centerInScrollContent(el));
        let nearest = 0;
        let minDist = Number.POSITIVE_INFINITY;
        groupCenters.forEach((gCenter, idx) => {
          const dist = Math.abs(gCenter - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            nearest = idx;
          }
        });
        baseIndex = atEnd ? threeItemCount - 1 : nearest;
        const [g0, g1, g2] = groupCenters;
        progress =
          baseIndex === threeItemCount - 1
            ? 0
            : baseIndex === 0
              ? Math.max(0, Math.min(1, g1 - g0 ? (viewportCenter - g0) / (g1 - g0) : 0))
              : Math.max(0, Math.min(1, g2 - g1 ? (viewportCenter - g1) / (g2 - g1) : 0));
        hasNext = baseIndex < threeItemCount - 1;

        buttons.forEach((btn, i) => {
          let w = DOT_SIZE;
          if (i === baseIndex) w = PILL_WIDTH - progress * WIDTH_RANGE;
          else if (hasNext && i === baseIndex + 1) w = DOT_SIZE + progress * WIDTH_RANGE;

          btn.style.width = `${w}px`;
          btn.style.minWidth = `${w}px`;
          btn.style.transformOrigin =
            i === baseIndex && progress > 0
              ? "right center"
              : hasNext && i === baseIndex + 1 && progress > 0
                ? "right center"
                : "center";
          btn.classList.toggle("scroll-indicator-pill", w > DOT_SIZE);
          btn.classList.toggle("scroll-indicator-dot", w <= DOT_SIZE);
        });
      } else if (isWork2 || cards.length === threeItemCount) {
        if (!cards.length || cards.length < threeItemCount || !buttons.length) {
          rafRef.current = null;
          return;
        }
        let nearest = 0;
        let minDist = Number.POSITIVE_INFINITY;
        cards.forEach((card, idx) => {
          const cardCenter = centerInScrollContent(card);
          const dist = Math.abs(cardCenter - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            nearest = idx;
          }
        });
        baseIndex = nearest;
        buttons.forEach((btn, i) => {
          const w = i === baseIndex ? PILL_WIDTH : DOT_SIZE;
          btn.style.width = `${w}px`;
          btn.style.minWidth = `${w}px`;
          btn.style.transformOrigin = "center";
          btn.classList.toggle("scroll-indicator-pill", w > DOT_SIZE);
          btn.classList.toggle("scroll-indicator-dot", w <= DOT_SIZE);
        });
      } else if (!isDesktop) {
        const cards = Array.from(scrollEl.querySelectorAll<HTMLElement>(cardSelector));
        if (!cards.length || !buttons.length) {
          rafRef.current = null;
          return;
        }
        let nearest = 0;
        let minDist = Number.POSITIVE_INFINITY;
        cards.forEach((card, idx) => {
          const cardCenter = centerInScrollContent(card);
          const dist = Math.abs(cardCenter - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            nearest = idx;
          }
        });
        baseIndex = nearest;
        buttons.forEach((btn, i) => {
          const w = i === baseIndex ? PILL_WIDTH : DOT_SIZE;
          btn.style.width = `${w}px`;
          btn.style.minWidth = `${w}px`;
          btn.style.transformOrigin = "center";
          btn.classList.toggle("scroll-indicator-pill", w > DOT_SIZE);
          btn.classList.toggle("scroll-indicator-dot", w <= DOT_SIZE);
        });
      } else {
        const cards = scrollEl.querySelectorAll<HTMLElement>(cardSelector);
        const group1Wrapper = cards[1]?.parentElement;
        if (!cards.length || cards.length < 4 || !group1Wrapper || !buttons.length) {
          rafRef.current = null;
          return;
        }
        const groupElements: HTMLElement[] = [cards[0], group1Wrapper, cards[3]];
        const groupCenters = groupElements.map((el) => centerInScrollContent(el));
        let nearest = 0;
        let minDist = Number.POSITIVE_INFINITY;
        groupCenters.forEach((gCenter, idx) => {
          const dist = Math.abs(gCenter - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            nearest = idx;
          }
        });
        baseIndex = atEnd ? DESKTOP_GROUP_COUNT - 1 : nearest;
        const [g0, g1, g2] = groupCenters;
        progress =
          baseIndex === DESKTOP_GROUP_COUNT - 1
            ? 0
            : baseIndex === 0
              ? Math.max(0, Math.min(1, (g1 - g0 ? (viewportCenter - g0) / (g1 - g0) : 0)))
              : Math.max(0, Math.min(1, (g2 - g1 ? (viewportCenter - g1) / (g2 - g1) : 0)));
        hasNext = baseIndex < DESKTOP_GROUP_COUNT - 1;

        buttons.forEach((btn, i) => {
          let w = DOT_SIZE;
          if (i === baseIndex) w = PILL_WIDTH - progress * WIDTH_RANGE;
          else if (hasNext && i === baseIndex + 1) w = DOT_SIZE + progress * WIDTH_RANGE;

          btn.style.width = `${w}px`;
          btn.style.minWidth = `${w}px`;
          // Pill shrinks to the left (from right); next dot grows toward the left (from right) so gap stays fixed
          btn.style.transformOrigin =
            i === baseIndex && progress > 0
              ? "right center"
              : hasNext && i === baseIndex + 1 && progress > 0
                ? "right center"
                : "center";
          btn.classList.toggle("scroll-indicator-pill", w > DOT_SIZE);
          btn.classList.toggle("scroll-indicator-dot", w <= DOT_SIZE);
        });
      }

      activeIndexRef.current = baseIndex;
      setActiveIndex((prev) => (prev !== baseIndex ? baseIndex : prev));
      rafRef.current = null;
    }

    let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;
    const SCROLL_END_MS = 120;

    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(updateIndicators);

      if (isWork2) {
        if (scrollEndTimer !== null) clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(() => {
          scrollEndTimer = null;
          const cards = Array.from(scrollEl.querySelectorAll<HTMLElement>(cardSelector));
          if (cards.length < WORK2_CARD_COUNT) return;
          const scrollRect = scrollEl.getBoundingClientRect();
          const scrollLeft = scrollEl.scrollLeft;
          const viewportCenter = scrollLeft + scrollEl.clientWidth / 2;
          const halfView = scrollEl.clientWidth / 2;
          const maxLeft = scrollEl.scrollWidth - scrollEl.clientWidth;
          function centerInContent(el: HTMLElement) {
            const r = el.getBoundingClientRect();
            return scrollLeft + (r.left - scrollRect.left) + r.width / 2;
          }
          const centers = cards.map(centerInContent);
          let nearest = 0;
          let minDist = Math.abs(viewportCenter - centers[0]);
          for (let i = 1; i < WORK2_CARD_COUNT; i++) {
            const d = Math.abs(viewportCenter - centers[i]);
            if (d < minDist) {
              minDist = d;
              nearest = i;
            }
          }
          const targetLeft = Math.max(0, Math.min(centers[nearest] - halfView, maxLeft));
          if (Math.abs(scrollEl.scrollLeft - targetLeft) > 4) {
            scrollEl.scrollTo({ left: targetLeft, behavior: "smooth" });
          }
        }, SCROLL_END_MS);
      } else if (isDesktop) {
        if (scrollEndTimer !== null) clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(() => {
          scrollEndTimer = null;
          const cards = Array.from(scrollEl.querySelectorAll<HTMLElement>(cardSelector));
          const scrollRect = scrollEl.getBoundingClientRect();
          const scrollLeft = scrollEl.scrollLeft;
          const viewportCenter = scrollLeft + scrollEl.clientWidth / 2;
          const halfView = scrollEl.clientWidth / 2;
          const maxLeft = scrollEl.scrollWidth - scrollEl.clientWidth;
          function centerInContent(el: HTMLElement) {
            const r = el.getBoundingClientRect();
            return scrollLeft + (r.left - scrollRect.left) + r.width / 2;
          }
          if (cards.length === 3) {
            const centers = cards.map(centerInContent);
            let nearest = 0;
            let minDist = Math.abs(viewportCenter - centers[0]);
            for (let i = 1; i < 3; i++) {
              const d = Math.abs(viewportCenter - centers[i]);
              if (d < minDist) {
                minDist = d;
                nearest = i;
              }
            }
            const targetLeft = Math.max(0, Math.min(centers[nearest] - halfView, maxLeft));
            if (Math.abs(scrollEl.scrollLeft - targetLeft) > 4) {
              scrollEl.scrollTo({ left: targetLeft, behavior: "smooth" });
            }
          } else {
            const group1Wrapper = cards[1]?.parentElement;
            if (cards.length < 4 || !group1Wrapper) return;
            const groupElements: HTMLElement[] = [cards[0], group1Wrapper, cards[3]];
            const centers = groupElements.map(centerInContent);
            let nearest = 0;
            let minDist = Math.abs(viewportCenter - centers[0]);
            for (let i = 1; i < 3; i++) {
              const d = Math.abs(viewportCenter - centers[i]);
              if (d < minDist) {
                minDist = d;
                nearest = i;
              }
            }
            const targetLeft = Math.max(0, Math.min(centers[nearest] - halfView, maxLeft));
            if (Math.abs(scrollEl.scrollLeft - targetLeft) > 4) {
              scrollEl.scrollTo({ left: targetLeft, behavior: "smooth" });
            }
          }
        }, SCROLL_END_MS);
      }
    }

    updateIndicators();
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (scrollEndTimer !== null) clearTimeout(scrollEndTimer);
    };
  }, [isDesktop, isWork2, scrollSelector, cardSelector]);

  const scrollToCard = useCallback(
    (index: number) => {
      const el = document.querySelector(scrollSelector) as HTMLElement | null;
      if (!el) return;

      const cards = el.querySelectorAll<HTMLElement>(cardSelector);
      if (isWork2 || cards.length === 3) {
        const targetEl = cards[index];
        if (!targetEl) return;
        const scrollRect = el.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        const centerInContent = el.scrollLeft + (targetRect.left - scrollRect.left) + targetRect.width / 2;
        const halfView = el.clientWidth / 2;
        const targetLeft = Math.max(0, Math.min(centerInContent - halfView, el.scrollWidth - el.clientWidth));
        el.scrollTo({ left: targetLeft, behavior: "smooth" });
        return;
      }

      if (isDesktop) {
        const group1Wrapper = cards[1]?.parentElement;
        if (cards.length < 4 || !group1Wrapper) return;
        const groupElements: HTMLElement[] = [cards[0], group1Wrapper, cards[3]];
        const targetEl = groupElements[index];
        if (!targetEl) return;
        const scrollRect = el.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        const groupCenterInContent = el.scrollLeft + (targetRect.left - scrollRect.left) + targetRect.width / 2;
        const halfView = el.clientWidth / 2;
        const targetLeft = Math.max(0, Math.min(groupCenterInContent - halfView, el.scrollWidth - el.clientWidth));
        el.scrollTo({ left: targetLeft, behavior: "smooth" });
        return;
      }

      const card = cards[index];
      if (card) {
        card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    },
    [isDesktop, isWork2, scrollSelector, cardSelector],
  );

  // Reset fill progress when starting play or when advancing
  useEffect(() => {
    if (isPlaying) {
      fillStartTimeRef.current = Date.now();
      setFillProgress(0);
    }
  }, [isPlaying, activeIndex]);

  // Auto-scroll: advance to next card every interval when playing
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    function advance() {
      const current = activeIndexRef.current;
      fillStartTimeRef.current = Date.now();
      setFillProgress(0);
      const maxIndex = isWork2 ? WORK2_CARD_COUNT - 1 : DESKTOP_GROUP_COUNT - 1;
      if (current >= maxIndex) {
        setIsPlaying(false);
        setHasCompleted(true);
        return;
      }
      const next = current + 1;
      scrollToCard(next);
    }

    intervalRef.current = setInterval(advance, AUTO_SCROLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, scrollToCard]);

  // Animate fill progress over 4s when playing
  useEffect(() => {
    if (!isPlaying) return;
    let rafId: number;
    function tick() {
      const elapsed = Date.now() - fillStartTimeRef.current;
      const p = Math.min(1, elapsed / AUTO_SCROLL_INTERVAL_MS);
      setFillProgress(p);
      if (p < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, activeIndex]);

  function handleControlClick() {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    if (hasCompleted) {
      setHasCompleted(false);
      activeIndexRef.current = 0;
      setActiveIndex(0);
      scrollToCard(0);
      setIsPlaying(true);
      return;
    }

    setIsPlaying(true);
  }

  const pillClass = darkTheme
    ? "flex h-[56px] w-[162px] items-center justify-center rounded-full bg-white/10 backdrop-blur-md"
    : "glass-pill flex h-[56px] w-[162px] items-center justify-center rounded-full";
  const dotClass = darkTheme
    ? "bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
    : "bg-foreground-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";
  const fillClass = darkTheme ? "bg-white" : "bg-foreground-primary";

  return (
    <div className="flex items-center justify-center gap-3 pt-12 pb-2">
      <div className={pillClass} aria-hidden>
        <div
          ref={trackRef}
          className="scroll-indicator-track flex items-center justify-center"
          style={{ gap: MARGIN_PX }}
          role="tablist"
          aria-label="Scroll position"
        >
          {Array.from({ length: isWork2 ? WORK2_CARD_COUNT : DESKTOP_GROUP_COUNT }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Card ${i + 1}`}
              onClick={() => {
                if (hasCompleted) setHasCompleted(false);
                scrollToCard(i);
              }}
              className={`scroll-indicator-item relative h-[8px] overflow-hidden rounded-full ${dotClass} ${
                i === 0 ? "scroll-indicator-pill" : "scroll-indicator-dot"
              }`}
              style={{
                width: i === 0 ? PILL_WIDTH : DOT_SIZE,
                minWidth: i === 0 ? PILL_WIDTH : DOT_SIZE,
                transformOrigin: "center",
                transition: "none",
              }}
            >
              {isPlaying && activeIndex === i && (
                <span
                  className={`absolute inset-y-0 left-0 rounded-full ${fillClass}`}
                  style={{ width: `${fillProgress * 100}%` }}
                  aria-hidden
                />
              )}
            </button>
          ))}
        </div>
      </div>
      {!hidePlayButton && (
        <button
          type="button"
          onClick={handleControlClick}
          aria-label={
            isPlaying
              ? "Pause auto-scroll"
              : hasCompleted
                ? isWork2 ? "Replay" : "Replay work cards"
                : "Play auto-scroll"
          }
          className={`flex h-[56px] w-[56px] min-h-touch min-w-touch shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
            darkTheme
              ? "bg-white/10 backdrop-blur-md text-white focus-visible:outline-white"
              : "glass-pill text-foreground-primary focus-visible:outline-accent"
          }`}
        >
          {isPlaying ? (
            <PauseIcon className="h-6 w-6" />
          ) : hasCompleted ? (
            <ReplayIcon className="h-6 w-6" />
          ) : (
            <PlayIcon className="h-6 w-6" />
          )}
        </button>
      )}
    </div>
  );
}