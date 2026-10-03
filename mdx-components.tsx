import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block";
import { FieldNote, GuideHeading } from "@/components/guide";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: GuideHeading,
    blockquote: FieldNote,
    pre: CodeBlock,
    ...components,
  };
}
