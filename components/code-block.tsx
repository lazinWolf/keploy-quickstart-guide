import { isValidElement, type ReactNode } from "react";
import { codeToHtml } from "shiki";
import { CodeFrame } from "./code-frame";

function getLabel(code: string, lang: string) {
  if (lang === "json") return "Example response";
  if (code.includes("go.dev/dl/")) return "Terminal · Install Go";
  if (code.includes("download.docker.com/")) return "Terminal · Install Docker";
  if (code.includes("keploy.io/install.sh")) return "Terminal · Install Keploy";
  if (code.startsWith("git clone")) return "Terminal 1 · Setup";
  if (code.startsWith("go build")) return "Terminal 2 · Build";
  if (code.includes("keploy record")) return "Terminal 2 · Record";
  if (code.includes("keploy test")) return "Terminal 2 · Replay";
  if (code.startsWith("curl --request")) return "Terminal 3 · Create a link";
  if (code.startsWith("curl -i")) return "Terminal 3 · Open the link";
  if (code.startsWith("docker compose up")) return "Terminal 1 · PostgreSQL";
  return "Terminal · Project directory";
}

export async function CodeBlock({ children }: { children?: ReactNode }) {
  if (!isValidElement<{ children?: string; className?: string }>(children))
    return <pre>{children}</pre>;
  const code = String(children.props.children ?? "").replace(/\n$/, "");
  const lang = children.props.className?.replace("language-", "") || "text";
  const html = await codeToHtml(code, { lang, theme: "github-dark-default" });
  return <CodeFrame code={code} html={html} label={getLabel(code, lang)} />;
}
