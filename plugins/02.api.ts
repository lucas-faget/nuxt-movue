export default defineNuxtPlugin((): any => {
    const { $apiConfig } = useNuxtApp();

    const apiBaseUrl: string = $apiConfig.apiBaseUrl;
    const apiKey: string = $apiConfig.apiKey;
    const maxPageNumber: number = +$apiConfig.apiMaxPageNumber;

    /**
     * Fetches movie list data from the API endpoint.
     * @param endpoint
     * @param params
     * @returns
     */
    async function fetchMovieList(endpoint: string, params: Record<string, any> = {}) {
        const { data } = await useFetch(`${apiBaseUrl}/${endpoint}`, {
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
    async function fetchMovie(endpoint: string, params: Record<string, any> = {}) {
        const { data } = await useFetch(`${apiBaseUrl}/${endpoint}`, {
            params: {
                api_key: apiKey,
                ...params,
            },
        });

        return data.value;
    }

    async function fetchNowPlayingMovies(page: number = 1) {
        return await fetchMovieList("movie/now_playing", { page });
    }

    async function fetchTopRatedMovies(page: number = 1) {
        return await fetchMovieList("movie/top_rated", { page });
    }

    async function fetchPopularMovies(page: number = 1) {
        return await fetchMovieList("movie/popular", { page });
    }

    async function fetchUpcomingMovies(page: number = 1) {
        return await fetchMovieList("movie/upcoming", { page });
    }

    async function fetchMovieDetails(id: string) {
        return await fetchMovie(`movie/${id}`);
    }

    async function fetchSimilarMovies(id: string, page: number = 1) {
        return await fetchMovieList(`movie/${id}/similar`, { page });
    }

    async function searchMovies(query: string = "", page: number = 1) {
        return await fetchMovieList("search/movie", { query, page, include_adult: false });
    }

    return {
        provide: {
            api: {
                fetchNowPlayingMovies,
                fetchTopRatedMovies,
                fetchPopularMovies,
                fetchUpcomingMovies,
                fetchMovieDetails,
                fetchSimilarMovies,
                searchMovies,
            },
        },
    };
});
