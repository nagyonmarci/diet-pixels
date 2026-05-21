"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

const PageFooter = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation();

  const recommendations = [
    {
      href: APP_CONFIG.KARIMZ_IMGCOMPRESS_URL,
      title: t("footer.recommendations.imgcompress.title"),
      description: t("footer.recommendations.imgcompress.description"),
    },
    {
      href: APP_CONFIG.IMGPROXY_URL,
      title: t("footer.recommendations.imgproxy.title"),
      description: t("footer.recommendations.imgproxy.description"),
    },
  ];

  return (
    <footer className="w-full max-w-3xl mt-16 pt-8 pb-6 text-center border-t border-border/40" {...props}>
      <div className="space-y-4">
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          {recommendations.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-border/50 bg-background/40 px-4 py-3 text-left transition-colors hover:border-foreground/30 hover:bg-muted/40"
            >
              <span className="flex items-center justify-between gap-3 text-sm font-semibold text-foreground">
                {repo.title}
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                {repo.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
