<script setup lang="ts">
import type { Movie } from "~/types/Movie";
import type { MovieList } from "~/types/MovieList";
const { $api, $images } = useNuxtApp() as any;

const movies = ref<Movie[]>([]);
const isPending = ref<boolean>(true);

async function getMovies() {
    try {
        const data: MovieList = (await $api.fetchPopularMovies()) as MovieList;
        movies.value = data.results;
        console.log(movies.value);
    } catch (error) {
        console.error("Failed to fetch movies: ", error);
    } finally {
        isPending.value = false;
    }
}

getMovies();
</script>

<template>
    <section class="w-full mt-16 p-8">
        <UCarousel v-slot="{ item: movie }" :items="movies" arrows>
            <div class="relative mt-4">
                <UBadge
                    v-if="movie.vote_average"
                    size="lg"
                    color=""
                    class="badge-center absolute bg-amber-200 font-bold"
                    :ui="{ rounded: 'rounded-full' }"
                >
                    {{ movie.vote_average.toFixed(1) }}
                </UBadge>
                <img
                    :src="$images.getPosterUrl(movie.poster_path)"
                    width="200"
                    height="300"
                    draggable="false"
                />
            </div>
        </UCarousel>
    </section>
</template>

<style scoped>
.badge-center {
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
