import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uk"], // Temporarily disabled multilanguage for testing
  defaultLocale: "uk",
  localePrefix: "as-needed",
  // Removed pathnames since we only have a single page
});
