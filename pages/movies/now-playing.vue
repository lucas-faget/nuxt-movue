<script setup lang="ts">
import type { Movie } from "~/types/Movie";
import type { MovieList } from "~/types/MovieList";
import { fetchNowPlayingMovies } from "~/services/movies";

const movies = ref<Movie[]>([]);
const totalPages = ref<number>(0);
const totalResults = ref<number>(0);
const isPending = ref<boolean>(true);

async function getMovies(page: number) {
    try {
        const data: MovieList = (await fetchNowPlayingMovies(page)) as MovieList;
        movies.value = data.results;
        totalPages.value = data.total_pages;
        totalResults.value = data.total_results;
    } catch (error) {
        console.error("Failed to fetch movies: ", error);
    } finally {
        isPending.value = false;
    }
}

getMovies(1);
</script>

<template>
    <section class="p-8 flex flex-col gap-8">
        <NuxtLayout name="movies" title="Now Playing Movies">
            <MovieCatalog
                :movies="movies"
                :total-pages="totalPages"
                :total-results="totalResults"
                @change-page="getMovies"
            />
        </NuxtLayout>
    </section>
</template>
