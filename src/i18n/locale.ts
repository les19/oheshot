export function hasLocale(
  locales: readonly string[],
  locale: string | null | undefined
): boolean {
  return typeof locale === "string" && locales.includes(locale);
}
