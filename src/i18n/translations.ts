// SPDX-FileCopyrightText: 2026 Eugene Fisher <z.ribin20@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

export const SUPPORTED_LANGS = ["en", "ru"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

const en = {
  "meta.title": "Calc",
  "meta.description": "A minimal calculator with subscription plans.",
  "aria.calculator": "Calculator",
  "aria.keypad": "Keypad",
  "aria.equals": "Equals",
  "aria.switchEn": "Switch to English",
  "aria.switchRu": "Switch to Russian",
  "paywall.eyebrow": "Subscription required",
  "paywall.title": "Subscribe to view your result",
  "paywall.lede":
    "Calc requires an active subscription. Choose a plan to continue.",
  "plan.month": "/ month",
  "plan.go.tag": "For individuals",
  "plan.go.cta": "Choose Go",
  "plan.go.f1": "Up to 1,000 calculations per month",
  "plan.go.f2": "Standard arithmetic operations",
  "plan.go.f3": "Calculation history",
  "plan.go.f4": "Email support",
  "plan.go.f5": "Single user",
  "plan.ultra.ribbon": "Recommended",
  "plan.ultra.tag": "For teams and power users",
  "plan.ultra.cta": "Choose Ultra",
  "plan.ultra.f1": "Unlimited calculations",
  "plan.ultra.f2": "High-precision and scientific operations",
  "plan.ultra.f3": "Priority support, 24/7",
  "plan.ultra.f4": "Team workspaces, up to 25 seats",
  "plan.ultra.f5": "SSO, SCIM, audit logs",
  "plan.ultra.f6": "SOC 2 Type II compliance",
  "toast.checkout": "Payment processor is temporarily unavailable.",
} as const;

export type TranslationKey = keyof typeof en;

const ru: Record<TranslationKey, string> = {
  "meta.title": "Calc",
  "meta.description": "Минималистичный калькулятор с тарифной подпиской.",
  "aria.calculator": "Калькулятор",
  "aria.keypad": "Клавиатура",
  "aria.equals": "Равно",
  "aria.switchEn": "Переключить на английский",
  "aria.switchRu": "Переключить на русский",
  "paywall.eyebrow": "Требуется подписка",
  "paywall.title": "Подпишитесь, чтобы увидеть результат",
  "paywall.lede":
    "Calc требует активной подписки. Выберите тариф, чтобы продолжить.",
  "plan.month": "/ мес",
  "plan.go.tag": "Для частных пользователей",
  "plan.go.cta": "Выбрать Go",
  "plan.go.f1": "До 1 000 вычислений в месяц",
  "plan.go.f2": "Стандартные арифметические операции",
  "plan.go.f3": "История вычислений",
  "plan.go.f4": "Поддержка по электронной почте",
  "plan.go.f5": "Один пользователь",
  "plan.ultra.ribbon": "Рекомендуем",
  "plan.ultra.tag": "Для команд и продвинутых пользователей",
  "plan.ultra.cta": "Выбрать Ultra",
  "plan.ultra.f1": "Безлимитные вычисления",
  "plan.ultra.f2": "Высокоточные и научные операции",
  "plan.ultra.f3": "Приоритетная поддержка 24/7",
  "plan.ultra.f4": "Командные рабочие пространства, до 25 пользователей",
  "plan.ultra.f5": "SSO, SCIM, журналы аудита",
  "plan.ultra.f6": "Соответствие SOC 2 Type II",
  "toast.checkout": "Платёжный процессор временно недоступен.",
};

export const translations: Record<Lang, Record<TranslationKey, string>> = {
  en,
  ru,
};
