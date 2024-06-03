// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/css/main.css"],
    modules: ["@nuxt/ui"],

    app: {
        pageTransition: { name: "page", mode: "out-in" },
    },

    runtimeConfig: {
        // The private keys which are only available server-side
        // tmdbApiKey: process.env.TMDB_API_KEY,
        // Keys within public are also exposed client-side
        public: {
            tmdbApiBaseUrl: process.env.TMDB_API_BASE_URL,
            tmdbApiKey: process.env.TMDB_API_KEY,
            tmdbImgBaseUrlKey: process.env.TMDB_IMG_BASE_URL,
            tmdbMaxPageNumber: process.env.TMDB_MAX_PAGE_NUMBER,
        },
    },
});
