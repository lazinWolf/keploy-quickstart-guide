import {
  Children,
  isValidElement,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import {
  ExternalLink,
  FlaskConical,
  MousePointer2,
  PencilLine,
  Radio,
  RotateCcw,
} from "lucide-react";
import { GuideNavigation } from "./guide-navigation";

export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GuideNavigation />
      <main id="main-content" className="guide-main" tabIndex={-1}>
        <article className="guide-article">{children}</article>
        <footer className="site-footer">
          <span>
            Written from my experience following the Keploy quickstart.
          </span>
          <a href="#overview">Back to the beginning</a>
        </footer>
      </main>
    </>
  );
}

export function GuideHero() {
  return (
    <header className="guide-hero" id="overview">
      <div className="hero-eyebrow">
        <span className="eyebrow-line" />
        API TESTING, STEP BY STEP
      </div>
      <h1>
        Your first API tests
        <br className="desktop-break" /> with Keploy.
      </h1>
      <p className="hero-subtitle">
        Create a short link, open it, then let Keploy repeat those requests for
        you.
      </p>
      <div className="hero-tags">
        <span>Go</span>
        <span>Echo</span>
        <span>PostgreSQL</span>
        <span className="platform-tag">Linux / WSL2</span>
      </div>
    </header>
  );
}

export function Journey() {
  return (
    <div
      className="journey"
      aria-label="The workflow: record, make requests, replay"
    >
      <div>
        <Radio size={17} />
        <span>Start recording</span>
      </div>
      <span className="journey-connector" />
      <div>
        <MousePointer2 size={17} />
        <span>Use the app</span>
      </div>
      <span className="journey-connector" />
      <div>
        <RotateCcw size={17} />
        <span>Replay as tests</span>
      </div>
    </div>
  );
}

function plainText(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : isValidElement<{ children?: ReactNode }>(child)
          ? plainText(child.props.children)
          : "",
    )
    .join("");
}

export function GuideHeading({
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  const text = plainText(children);
  const match = text.match(/^(\d)\. (.+)$/);
  return (
    <h2 {...props} className={match ? "step-heading" : "section-heading"}>
      {match ? (
        <>
          <span className="step-number">{match[1]}</span>
          <span>{match[2]}</span>
        </>
      ) : (
        children
      )}
    </h2>
  );
}

export function FieldNote({
  children,
  label = "From my run",
}: {
  children?: ReactNode;
  label?: string;
}) {
  return (
    <aside className="field-note">
      <div className="note-label">
        <PencilLine size={16} aria-hidden="true" />
        <span>{label}</span>
      </div>
      <div>{children}</div>
    </aside>
  );
}

export function Prerequisites({ children }: { children: ReactNode }) {
  return (
    <div className="prerequisites">
      <span className="prerequisite-label">BEFORE YOU START</span>
      <div>{children}</div>
    </div>
  );
}

export function ExtraExercises({ children }: { children: ReactNode }) {
  return (
    <div className="extra-exercises">
      <div className="exercise-label">
        <FlaskConical size={16} />
        Optional · Try it for yourself
      </div>
      {children}
    </div>
  );
}

export function OriginalReference() {
  return (
    <div className="original-reference">
      <span>Following along with the original?</span>
      <a
        href="https://keploy.io/docs/quickstart/samples-echo/#running-app-locally-on-linuxwsl-"
        target="_blank"
        rel="noreferrer"
      >
        Keploy's Echo + PostgreSQL quickstart <ExternalLink size={14} />
      </a>
    </div>
  );
}
