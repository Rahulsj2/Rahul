import type { Metadata } from "next";
import Script from "next/script";
import { AppShell } from "@/components/AppShell";
import { SectionProvider } from "@/contexts/SectionContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Portfolio", template: "%s | Portfolio" },
  description: "Portfolio — design and build.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EZT2Q58P6W"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EZT2Q58P6W');
          `}
        </Script>
      </head>
      <body className="h-screen h-[100dvh] overflow-hidden font-sans flex flex-col bg-background-primary">
        <div id="scroll-container" className="h-full overflow-y-auto overflow-x-hidden">
          <ScrollToTop />
          <SectionProvider>
            <AppShell>{children}</AppShell>
          </SectionProvider>
        </div>
      </body>
    </html>
  );
}
