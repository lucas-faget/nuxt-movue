import type { BackdropSize } from "~/types/BackdropSize";
import type { Movie } from "~/types/Movie";
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

export async function fetchNowPlayingMovies(page: number = 1) {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/now_playing`, {
        params: {
            api_key: apiKey,
            page: page,
        },
    });

    return data.value;
}

export async function fetchTopRatedMovies(page: number = 1) {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/top_rated`, {
        params: {
            api_key: apiKey,
            page: page,
        },
    });

    return data.value;
}

export async function fetchPopularMovies(page: number = 1) {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/popular`, {
        params: {
            api_key: apiKey,
            page: page,
        },
    });

    return data.value;
}

export async function fetchUpcomingMovies(page: number = 1) {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/upcoming`, {
        params: {
            api_key: apiKey,
            page: page,
        },
    });

    return data.value;
}

export async function fetchMovieDetails(id: string) {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/${id}`, {
        params: {
            api_key: apiKey,
        },
    });

    return data.value;
}

export async function fetchSimilarMovies(id: string, page: number = 1) {
    const { pending, data, error } = await useFetch(`${baseUrl}/movie/${id}/similar`, {
        params: {
            api_key: apiKey,
            page: page,
        },
    });

    return data.value;
}
