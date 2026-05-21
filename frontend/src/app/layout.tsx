import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { I18nProvider } from "@/context/I18nProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "DietPixels",
  description: "DietPixels: a small imgproxy-backed image compression UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const engineLabel = process.env.ENGINE_LABEL;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Top-RIGHT: Engine badge + Language + Theme Toggle */}
            <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
              {engineLabel && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-mono">
                  {engineLabel}
                </span>
              )}
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
