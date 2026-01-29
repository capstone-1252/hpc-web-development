// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://ahas.ca",
	base: "/docs",
	integrations: [
		starlight({
			title: 'AHAS Website',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cjodo/astro-example' }],
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
