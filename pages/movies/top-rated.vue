<script setup lang="ts">
import type { Movie } from "~/types/Movie";
import type { MovieList } from "~/types/MovieList";
import { fetchTopRatedMovies } from "~/services/movies";

const page = ref<number>(1);
const movies = ref<Movie[]>([]);
const totalPages = ref<number>(0);
const totalResults = ref<number>(0);
const isPending = ref<boolean>(true);

async function getMovies() {
    try {
        const data: MovieList = (await fetchTopRatedMovies(page.value)) as MovieList;
        page.value = data.page;
        movies.value = data.results;
        totalPages.value = data.total_pages;
        totalResults.value = data.total_results;
    } catch (error) {
        console.error("Failed to fetch movies: ", error);
    } finally {
        isPending.value = false;
    }
}

getMovies();

watch(page, () => {
    getMovies();
});
</script>

<template>
    <section class="mt-16 p-8 flex flex-col gap-8">
        <NuxtLayout name="movies" title="Top Rated Movies">
            <MovieCatalog
                v-model="page"
                :movies="movies"
                :total-pages="totalPages"
                :total-results="totalResults"
                @change-page="getMovies"
            />
        </NuxtLayout>
    </section>
</template>
