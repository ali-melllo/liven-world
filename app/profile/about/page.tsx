"use client";

import { Info } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      {/* App Introduction */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
          <Info className="h-8 w-8 text-orange-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">{t("aboutTitle")}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{t("aboutDescription")}</p>
        </div>
      </div>

      {/* Core Features */}
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">{t("aboutFeatureChatTitle")}</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">{t("aboutFeatureChatDesc")}</p>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">{t("aboutFeatureHelpTitle")}</h3>
          <p className="text-sm text-green-700 dark:text-green-300">{t("aboutFeatureHelpDesc")}</p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">{t("aboutSafetyTitle")}</h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">{t("aboutSafetyDesc")}</p>
        </div>
      </div>
    </div>
  );
}
