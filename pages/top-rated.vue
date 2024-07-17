<script setup lang="ts">
import type { Movie } from "~/types/Movie";
import type { MovieList } from "~/types/MovieList";
const { $api } = useNuxtApp() as any;

definePageMeta({
    layout: "home",
});

const movies = ref<Movie[]>([]);
const isPending = ref<boolean>(true);

async function getMovies() {
    try {
        const data: MovieList = (await $api.fetchTopRatedMovies()) as MovieList;
        movies.value = data.results;
    } catch (error) {
        console.error("Failed to fetch movies: ", error);
    } finally {
        isPending.value = false;
    }
}

getMovies();
</script>

<template>
    <div v-if="!isPending && movies.length > 0">
        <MovieCarousel :movies="movies" />
    </div>
</template>
