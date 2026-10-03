"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CodeFrame({
  code,
  html,
  label,
}: {
  code: string;
  html: string;
  label: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  async function copy() {
    if (timeout.current) clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("error");
    }
    timeout.current = setTimeout(() => setState("idle"), 2200);
  }
  return (
    <div className="code-frame">
      <div className="code-header">
        <span>
          <Terminal size={14} />
          {label}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="copy-button"
          onClick={copy}
          aria-label={`Copy ${label} code`}
        >
          {state === "copied" ? <Check size={14} /> : <Copy size={14} />}
          <span aria-live="polite">
            {state === "copied"
              ? "Copied"
              : state === "error"
                ? "Select to copy"
                : "Copy"}
          </span>
        </Button>
      </div>
      <div className="code-scroll" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
