// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/css/main.css"],
    app: {
        pageTransition: { name: "page", mode: "out-in" },
    },
    devtools: { enabled: true },
    $production: {
        routeRules: {
            "/**": { isr: true },
        },
    },
    $development: {
        //
    },
    runtimeConfig: {
        // The private keys which are only available server-side
        apiSecret: "123",
        // Keys within public are also exposed client-side
        public: {
            apiBase: "/api",
        },
    },
});
