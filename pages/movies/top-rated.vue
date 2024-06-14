<script setup lang="ts">
import type { Movie } from "~/types/Movie";
import type { MovieList } from "~/types/MovieList";
const { $api } = useNuxtApp() as any;

const page = ref<number>(1);
const movies = ref<Movie[]>([]);
const totalPages = ref<number>(0);
const totalResults = ref<number>(0);
const isPending = ref<boolean>(true);

async function getMovies() {
    try {
        const data: MovieList = (await $api.fetchTopRatedMovies(page.value)) as MovieList;
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
    <div class="p-8 flex flex-col gap-8">
        <NuxtLayout name="movies" title="Top Rated Movies">
            <MovieCatalog
                v-model="page"
                :movies="movies"
                :total-pages="totalPages"
                :total-results="totalResults"
                @change-page="getMovies"
            />
        </NuxtLayout>
    </div>
</template>
