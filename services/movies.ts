import type { BackdropSize } from "~/types/BackdropSize";
import type { PosterSize } from "~/types/PosterSize";

const config = useRuntimeConfig();

const baseUrl: string = config.public.tmdbApiBaseUrl;
const apiKey: string = config.public.tmdbApiKey;
const imgBaseUrl: string = config.public.tmdbImgBaseUrlKey;

export const getBackdropUrl = (size: BackdropSize, path: string): string => {
    return `${imgBaseUrl}/${size}/${path}`;
};

export const getPosterUrl = (size: PosterSize, path: string): string => {
    return `${imgBaseUrl}/${size}/${path}`;
};

export async function fetchNowPlayingMovies() {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/now_playing`, {
        params: {
            api_key: apiKey,
        },
    });

    return data.value;
}

export async function fetchTopRatedMovies() {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/top_rated`, {
        params: {
            api_key: apiKey,
        },
    });

    return data.value;
}

export async function fetchPopularMovies() {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/popular`, {
        params: {
            api_key: apiKey,
        },
    });

    return data.value;
}

export async function fetchUpcomingMovies() {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/upcoming`, {
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
