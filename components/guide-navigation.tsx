"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  BookOpen,
  ExternalLink,
  Menu,
  Moon,
  Sun,
  NotebookPen,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "1-get-the-url-shortener", label: "Get the sample app" },
  { id: "2-start-postgresql-and-connect-the-app", label: "Connect PostgreSQL" },
  { id: "3-build-the-go-app", label: "Build the app" },
  { id: "4-start-recording", label: "Start recording" },
  { id: "5-create-a-link-then-open-it", label: "Make your requests" },
  { id: "6-stop-recording-and-replay", label: "Replay your tests" },
];
const extraSections = [
  { id: "if-something-gets-in-the-way", label: "If you get stuck" },
  { id: "a-couple-of-things-to-try-next", label: "Try one more thing" },
  { id: "need-to-install-a-tool", label: "Installation help" },
];
const quickstart =
  "https://keploy.io/docs/quickstart/samples-echo/#running-app-locally-on-linuxwsl-";

export function GuideNavigation() {
  const [active, setActive] = useState("overview");
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let frame = 0;
    const update = () => {
      const ids = [...sections, ...extraSections];
      let current = "overview";
      for (const { id } of ids) {
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ??
            Infinity) <= 170
        )
          current = id;
      }
      setActive(current);
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        range > 0 ? Math.min(100, (window.scrollY / range) * 100) : 0,
      );
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  function navigate(id: string) {
    setActive(id);
    setMenuOpen(false);
  }

  const dark = mounted && resolvedTheme === "dark";
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to the tutorial
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a
            href="#overview"
            className="brand"
            onClick={() => navigate("overview")}
            aria-label="Walkthrough overview"
          >
            <NotebookPen
              size={24}
              strokeWidth={1.5}
              className="brand-mark"
              aria-hidden="true"
            />
            <span className="brand-name">
              Walkthrough<span className="brand-divider">/</span>
              <span className="brand-description">Keploy quickstart guide</span>
            </span>
          </a>
          <div className="header-actions">
            <a
              className="quickstart-link"
              href={quickstart}
              target="_blank"
              rel="noreferrer"
            >
              Original quickstart <ExternalLink size={14} />
            </a>
            <span className="header-rule" />
            <Button
              variant="ghost"
              size="icon"
              className="theme-button"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setTheme(dark ? "light" : "dark")}
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu-button"
              aria-label={
                menuOpen ? "Close guide navigation" : "Open guide navigation"
              }
              aria-expanded={menuOpen}
              aria-controls="guide-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
        <div
          className="reading-progress"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </header>

      <aside
        id="guide-navigation"
        className={`guide-sidebar ${menuOpen ? "is-open" : ""}`}
      >
        <nav aria-label="Tutorial sections">
          <p className="nav-eyebrow">IN THIS GUIDE</p>
          <a
            href="#overview"
            className={`nav-overview ${active === "overview" ? "is-active" : ""}`}
            aria-current={active === "overview" ? "location" : undefined}
            onClick={() => navigate("overview")}
          >
            <BookOpen size={16} /> Overview
          </a>
          <ol className="step-navigation">
            {sections.map(({ id, label }, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? "is-active" : ""}
                  aria-current={active === id ? "location" : undefined}
                  onClick={() => navigate(id)}
                >
                  <span className="nav-step-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="nav-extras">
            {extraSections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "is-active" : ""}
                aria-current={active === id ? "location" : undefined}
                onClick={() => navigate(id)}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
