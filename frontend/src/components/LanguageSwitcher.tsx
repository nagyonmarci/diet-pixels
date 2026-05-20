"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { i18n, LOCALE_STORAGE_KEY } from "@/i18n";

export function LanguageSwitcher() {
  const { t, i18n: i18nInstance } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isHu = i18nInstance.language === "hu";

  const toggle = () => {
    const next = isHu ? "en" : "hu";
    i18n.changeLanguage(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // localStorage unavailable in some private browsing modes
    }
  };

  return (
    <Button
      variant="default"
      size="sm"
      onClick={toggle}
      aria-label={t("langSwitcher.ariaLabel")}
      className="rounded-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 border border-zinc-700/40 shadow-sm px-3 font-medium text-xs"
    >
      {isHu ? "EN" : "HU"}
    </Button>
  );
}
