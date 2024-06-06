<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import type { Movie } from "~/types/Movie";
import type { MovieList } from "~/types/MovieList";
import { BackdropSize } from "~/types/BackdropSize";
import { fetchMovieDetails, fetchSimilarMovies, getBackdropUrl } from "~/services/movies";

const route = useRoute();

const id: string = route.params.id as string;
const movie = ref<Movie | undefined>(undefined);
const similarMovies = ref<Movie[]>([]);

const isSimilarMovieListEmpty = computed(() => similarMovies.value.length === 0);

async function getMovieById() {
    try {
        const data: Movie = (await fetchMovieDetails(id)) as Movie;
        movie.value = data;
    } catch (error) {
        console.error("Failed to fetch movie: ", error);
    }
}

async function getSimilarMovies() {
    try {
        const data: MovieList = (await fetchSimilarMovies(id)) as MovieList;
        similarMovies.value = data.results;
    } catch (error) {
        console.error("Failed to fetch movie: ", error);
    }
}

getMovieById();
getSimilarMovies();
</script>

<template>
    <section v-if="movie" class="w-full mt-16 flex flex-col gap-8">
        <div>
            <div class="flex">
                <div class="basis-2/5 p-16 flex flex-col gap-8">
                    <p class="text-5xl">{{ movie.title }}</p>
                    <UDivider />
                    <p>{{ movie.overview }}</p>
                    <UDivider />
                    <p>{{ movie.release_date }}</p>
                    <p>{{ movie.vote_average }}</p>
                </div>
                <div class="basis-3/5 image-container">
                    <img
                        :src="getBackdropUrl(BackdropSize.W780, movie.backdrop_path)"
                        :alt="movie.title"
                    />
                </div>
            </div>
        </div>
        <div v-if="!isSimilarMovieListEmpty" class="p-8">
            <MovieList :movies="similarMovies" />
        </div>
    </section>
</template>

<style scoped>
.image-container {
    position: relative;
    display: inline-block;
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
            rgba(18, 18, 18, 1) 0%,
            rgba(18, 18, 18, 0) 30%,
            rgba(18, 18, 18, 0) 70%,
            rgba(18, 18, 18, 1) 100%
        ),
        linear-gradient(
            90deg,
            rgba(18, 18, 18, 1) 0%,
            rgba(18, 18, 18, 0) 30%,
            rgba(18, 18, 18, 0) 70%,
            rgba(18, 18, 18, 1) 100%
        );
    pointer-events: none;
}

.image-container img {
    display: block;
    width: 100%;
    height: auto;
}
</style>
