"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/language-context";

export default function FAQ() {
  const { t } = useLanguage();

  // Define app-specific FAQ questions and answers
  const faqData = [
    {
      category: t("myHero"),
      items: [
        {
          question: t("howToPost"),
          answer: t("howToPostDesc"),
        },
        {
          question: t("helpRequestsGuidelines"),
          answer: t("helpRequestsGuidelinesDesc"),
        },
        {
          question: t("moderationRules"),
          answer: t("moderationRulesDesc"),
        },
        {
          question: t("privacyAndSafety"),
          answer: t("privacyAndSafetyDesc"),
        },
      ],
    },
    {
      category: t("notifications"),
      items: [
        {
          question: t("howToGetNotified"),
          answer: t("howToGetNotifiedDesc"),
        },
        {
          question: t("likeAndCommentNotifications"),
          answer: t("likeAndCommentNotificationsDesc"),
        },
      ],
    },
    {
      category: t("account"),
      items: [
        {
          question: t("updateProfile"),
          answer: t("updateProfileDesc"),
        },
        {
          question: t("changeLanguage"),
          answer: t("changeLanguageDesc"),
        },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">{t("faqTitle")}</h1>

      {faqData.map(({ category, items }) => (
        <div key={category} className="mb-6">
          <h2 className="text-lg font-medium mb-3">{category}</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {items.map(({ question, answer }, idx) => (
              <AccordionItem key={idx} value={`item-${category}-${idx}`}>
                <AccordionTrigger className="text-left">{question}</AccordionTrigger>
                <AccordionContent>
                  <p>{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
