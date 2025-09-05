"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="pb-4">
          <h1 className="text-xl font-semibold">{t("privacyPolicyTitle")}</h1>
        </CardHeader>
        <CardContent className="space-y-6 text-sm text-muted-foreground">
          <section className="space-y-2">
            <h2 className="font-semibold">{t("privacyIntroductionTitle")}</h2>
            <p>{t("privacyIntroductionDesc")}</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">{t("dataCollectionTitle")}</h2>
            <p>{t("dataCollectionDesc")}</p>
            <ul className="list-disc list-inside ml-4">
              <li>{t("dataCollectionUsers")}</li>
              <li>{t("dataCollectionPosts")}</li>
              <li>{t("dataCollectionComments")}</li>
              <li>{t("dataCollectionPush")}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">{t("dataUseTitle")}</h2>
            <p>{t("dataUseDesc")}</p>
            <ul className="list-disc list-inside ml-4">
              <li>{t("dataUseNotifications")}</li>
              <li>{t("dataUsePersonalization")}</li>
              <li>{t("dataUseAnalytics")}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">{t("dataSharingTitle")}</h2>
            <p>{t("dataSharingDesc")}</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">{t("securityTitle")}</h2>
            <p>{t("securityDesc")}</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">{t("userRightsTitle")}</h2>
            <p>{t("userRightsDesc")}</p>
            <ul className="list-disc list-inside ml-4">
              <li>{t("userRightsAccess")}</li>
              <li>{t("userRightsDelete")}</li>
              <li>{t("userRightsOptOut")}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">{t("contactTitle")}</h2>
            <p>{t("contactDesc")}</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
