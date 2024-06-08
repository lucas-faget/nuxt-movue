<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { format } from "date-fns";
import type { Movie } from "~/types/Movie";
import type { MovieList } from "~/types/MovieList";
import { BackdropSize } from "~/types/BackdropSize";
import { fetchMovieDetails, fetchSimilarMovies, getBackdropUrl } from "~/services/movies";

const route = useRoute();

const id: string = route.params.id as string;
const movie = ref<any | undefined>(undefined);
const similarMovies = ref<Movie[]>([]);

const isSimilarMovieListEmpty = computed(() => similarMovies.value.length === 0);

async function getMovieById() {
    try {
        const data: any = (await fetchMovieDetails(id)) as any;
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
    <section v-if="movie" class="w-full mt-16 flex flex-col">
        <div>
            <div class="flex">
                <div class="basis-2/5 p-12 flex flex-col gap-4">
                    <p v-if="movie.title" class="text-6xl font-title">{{ movie.title }}</p>

                    <UDivider v-if="movie.title" />

                    <div
                        v-if="movie.release_date || movie.runtime"
                        class="flex justify-between items-center leading-none"
                    >
                        <div v-if="movie.release_date" class="flex flex-col items-center">
                            <span class="text-4xl font-title">{{
                                format(movie.release_date, "yyyy")
                            }}</span>
                            <span class="text-md text-gray-400">{{
                                format(movie.release_date, "d MMM")
                            }}</span>
                        </div>
                        <div v-if="movie.runtime">
                            <span class="text-3xl font-title">{{ movie.runtime }}</span>
                            <span class="text-md text-gray-400 ml-1">min</span>
                        </div>
                    </div>

                    <UDivider v-if="movie.release_date || movie.runtime" />

                    <div
                        v-if="movie.genres && movie.genres.length > 0"
                        class="flex gap-2 items-center"
                    >
                        <UBadge
                            v-for="genre in movie.genres"
                            size="lg"
                            color="white"
                            variant="solid"
                        >
                            {{ genre.name }}
                        </UBadge>
                    </div>

                    <UDivider v-if="movie.genres && movie.genres.length > 0" />

                    <p v-if="movie.overview" class="text-gray-400">{{ movie.overview }}</p>

                    <UDivider v-if="movie.overview" />

                    <div
                        v-if="movie.vote_average || movie.origin_country"
                        class="flex justify-between items-center"
                    >
                        <div v-if="movie.vote_average" class="flex gap-2 items-center">
                            <UIcon class="w-6 h-6" name="i-heroicons-star" />
                            <span>{{ movie.vote_average.toFixed(1) }}</span>
                        </div>
                        <div v-if="movie.origin_country" class="flex gap-2 items-center">
                            <UIcon class="w-6 h-6" name="i-heroicons-globe-americas" />
                            <UKbd size="md">{{ movie.origin_country[0] }}</UKbd>
                        </div>
                    </div>
                </div>
                <div class="basis-3/5">
                    <div class="image-container">
                        <img
                            :src="getBackdropUrl(BackdropSize.W780, movie.backdrop_path)"
                            :alt="movie.title"
                        />
                    </div>
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
    width: 100%;
    height: auto;
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
    /* pointer-events: none; */
}

.image-container img {
    width: 100%;
    height: 100%;
}
</style>
