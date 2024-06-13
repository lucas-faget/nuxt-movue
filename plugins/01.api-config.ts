export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    return {
        provide: {
            apiConfig: {
                apiBaseUrl: config.public.apiBaseUrl,
                apiKey: config.public.apiKey,
                apiImgBaseUrl: config.public.apiImgBaseUrl,
                apiMaxPageNumber: config.public.apiMaxPageNumber,
            },
        },
    };
});
