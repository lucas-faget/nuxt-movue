const config = useRuntimeConfig();

const baseUrl: string = config.public.tmdbApiBaseUrl as string;
const apiKey: string = config.public.tmdbApiKey;

export async function fetchPopularMovies() {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/popular`, {
        params: {
            api_key: apiKey,
        },
    });

    return data.value;
}

export async function fetchMovieById(id: string) {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/${id}`, {
        params: {
            api_key: apiKey,
        },
    });

    return data.value;
}
