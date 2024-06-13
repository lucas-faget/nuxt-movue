<script setup lang="ts">
import { ref } from "vue";
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
    <section v-if="movie" class="w-full mt-16 flex flex-col">
        <div class="w-full relative" style="min-height: 75vh">
            <div class="image-container">
                <img :src="$images.getBackdropUrl(movie.backdrop_path)" :alt="movie.title" />
            </div>

            <div class="movie-details w-full max-w-[500px] min-h-[75vh] relative p-12 z-20">
                <MovieDetails :movie="movie" />
            </div>
        </div>

        <div v-if="!isSimilarMovieListEmpty" class="p-8 flex flex-col gap-8">
            <UDivider :label="'Similar Movies'" size="sm" />
            <MovieList :movies="similarMovies" />
            <UDivider size="sm" />
        </div>
    </section>
</template>

<style scoped>
.movie-details {
    background: linear-gradient(
        to right,
        rgba(18, 18, 18, 1) 0%,
        rgba(18, 18, 18, 0.8) 20%,
        rgba(18, 18, 18, 0.7) 80%,
        rgba(18, 18, 18, 0.6) 85%,
        rgba(18, 18, 18, 0.45) 90%,
        rgba(18, 18, 18, 0.25) 95%,
        rgba(18, 18, 18, 0) 100%
    );
}

.image-container {
    position: absolute;
    top: 0;
    right: 0;
    height: 75vh;
    z-index: 10;
    overflow: hidden;
}

.image-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
            0deg,
            var(--background-color) 0%,
            var(--background-color-transparent) 30%,
            var(--background-color-transparent) 70%,
            var(--background-color) 100%
        ),
        linear-gradient(
            90deg,
            var(--background-color) 0%,
            var(--background-color-transparent) 30%,
            var(--background-color-transparent) 70%,
            var(--background-color) 100%
        );
}

.image-container img {
    height: 100%;
    width: auto;
    object-fit: cover;
}
</style>
