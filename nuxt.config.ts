// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/css/main.css"],
    modules: ["@nuxt/ui"],

    app: {
        head: {
            link: [
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Quicksand:wght@400&display=swap",
                },
            ],
        },
        pageTransition: { name: "page", mode: "out-in" },
    },

    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.TMDB_BASE_URL,
            apiKey: process.env.TMDB_KEY,
            apiImgBaseUrl: process.env.TMDB_IMG_BASE_URL,
            apiMaxPageNumber: process.env.TMDB_MAX_PAGE_NUMBER,
        },
    },
});
