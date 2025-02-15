<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Movie } from "~/types/Movie";
import type { MovieList } from "~/types/MovieList";
const { $api, $images } = useNuxtApp() as any;

const route = useRoute();

const id: string = route.params.id as string;
const movie = ref<any | undefined>(undefined);
const similarMovies = ref<Movie[]>([]);

const isSimilarMovieListEmpty = computed(() => similarMovies.value.length === 0);

async function getMovieById() {
    try {
        const data: any = (await $api.fetchMovieDetails(id)) as any;
        movie.value = data;
    } catch (error) {
        console.error("Failed to fetch movie: ", error);
    }
}

async function getSimilarMovies() {
    try {
        const data: MovieList = (await $api.fetchSimilarMovies(id)) as MovieList;
        similarMovies.value = data.results;
    } catch (error) {
        console.error("Failed to fetch movie: ", error);
    }
}

getMovieById();
getSimilarMovies();
</script>

<template>
    <div v-if="movie" class="flex flex-col">
        <div class="relative w-full min-h-[75vh] flex justify-between">
            <div class="relative w-full max-w-[500px] min-h-full p-12 z-30 shrink-0 -mr-[100px]">
                <MovieDetails :movie="movie" />
            </div>

            <div class="image max-sm:hidden relative h-[75vh] min-h-[400px] w-auto z-10">
                <img
                    class="w-full h-full object-cover"
                    :src="$images.getBackdropUrl(movie.backdrop_path)"
                    :alt="movie.title"
                />
            </div>
        </div>

        <div v-if="!isSimilarMovieListEmpty" class="p-8 flex flex-col gap-8">
            <UDivider :label="'Similar Movies'" size="sm" />
            <MovieList :movies="similarMovies" />
            <UDivider size="sm" />
        </div>
    </div>
</template>

<style scoped>
.image::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 20;
    background: linear-gradient(
            0deg,
            var(--background-color) 0%,
            var(--background-color-transparent) 200px,
            var(--background-color-transparent) calc(100% - 200px),
            var(--background-color) 100%
        ),
        linear-gradient(
            90deg,
            var(--background-color) 0%,
            var(--background-color-transparent) 400px,
            var(--background-color-transparent) calc(100% - 200px),
            var(--background-color) 100%
        );
}
</style>
