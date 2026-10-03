import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your first API tests with Keploy | A developer’s walkthrough",
  description:
    "Record and replay your first API tests with Go, Echo, PostgreSQL, and Keploy. A practical walkthrough with notes from a real Linux setup.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
