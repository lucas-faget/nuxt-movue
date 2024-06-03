import type { BackdropSize } from "~/types/BackdropSize";
import type { PosterSize } from "~/types/PosterSize";

const config = useRuntimeConfig();

const baseUrl: string = config.public.tmdbApiBaseUrl;
const apiKey: string = config.public.tmdbApiKey;
const imgBaseUrl: string = config.public.tmdbImgBaseUrlKey;
const maxPageNumber: number = +config.public.tmdbMaxPageNumber;

export const getBackdropUrl = (size: BackdropSize, path: string): string => {
    return `${imgBaseUrl}/${size}/${path}`;
};

export const getPosterUrl = (size: PosterSize, path: string): string => {
    return `${imgBaseUrl}/${size}/${path}`;
};

/**
 * Fetches movie list data from the API endpoint.
 * @param endpoint
 * @param params
 * @returns
 */
export async function fetchMovieList(endpoint: string, params: Record<string, any> = {}) {
    const { pending, data, error } = await useFetch(`${baseUrl}/${endpoint}`, {
        params: {
            api_key: apiKey,
            ...params,
        },
    });

    if (data.value.total_pages > maxPageNumber) {
        const pageCount: number = Math.ceil(data.value.total_results / data.value.total_pages);
        data.value.total_pages = maxPageNumber;
        data.value.total_results = maxPageNumber * pageCount;
    }

    return data.value;
}

/**
 * Fetches movie details from the API endpoint.
 * @param endpoint
 * @param params
 * @returns
 */
export async function fetchMovie(endpoint: string, params: Record<string, any> = {}) {
    const { pending, data, error } = await useFetch(`${baseUrl}/${endpoint}`, {
        params: {
            api_key: apiKey,
            ...params,
        },
    });

    return data.value;
}

export async function fetchNowPlayingMovies(page: number = 1) {
    return await fetchMovieList("movie/now_playing", { page });
}

export async function fetchTopRatedMovies(page: number = 1) {
    return await fetchMovieList("movie/top_rated", { page });
}

export async function fetchPopularMovies(page: number = 1) {
    return await fetchMovieList("movie/popular", { page });
}

export async function fetchUpcomingMovies(page: number = 1) {
    return await fetchMovieList("movie/upcoming", { page });
}

export async function fetchMovieDetails(id: string) {
    return await fetchMovie(`movie/${id}`);
}

export async function fetchSimilarMovies(id: string, page: number = 1) {
    return await fetchMovieList(`movie/${id}/similar`, { page });
}

export async function searchMovies(query: string = "", page: number = 1) {
    return await fetchMovieList("search/movie", { query, page });
}
