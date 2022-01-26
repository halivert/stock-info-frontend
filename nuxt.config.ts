import { defineNuxtConfig } from "nuxt3"

export default defineNuxtConfig({
	css: ["bulma"],
	publicRuntimeConfig: {
		API_URL: process.env.API_URL,
	},
})
