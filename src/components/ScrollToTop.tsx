"use client";
import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (container) container.scrollTop = 0;
  }, []);
  return null;
}
