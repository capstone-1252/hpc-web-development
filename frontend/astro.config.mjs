// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ahas.ca",
  redirects: {
    "/donate": "/get-involved",
  },
  integrations: [react(), partytown(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
