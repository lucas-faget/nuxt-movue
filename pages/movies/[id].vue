<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import type { Movie } from "~/types/Movie";
import { BackdropSize } from "~/types/BackdropSize";
import { PosterSize } from "~/types/PosterSize";
import { fetchMovieDetails, getBackdropUrl, getPosterUrl } from "~/services/movies";

const route = useRoute();

const movie = ref<Movie | undefined>(undefined);
const isPending = ref<boolean>(true);

async function getMovieById() {
    try {
        const data = await fetchMovieDetails(route.params.id);
        movie.value = data;
    } catch (error) {
        console.error("Failed to fetch movie: ", error);
    } finally {
        isPending.value = false;
    }
}

getMovieById();
</script>

<template>
    <section>
        <div v-if="movie && !isPending">
            <img :src="getPosterUrl(PosterSize.W154, movie.poster_path)" :alt="movie.title" />
            <p>{{ movie.id }}</p>
            <p>{{ movie.title }}</p>
            <p>{{ movie.overview }}</p>
            <p>{{ movie.release_date }}</p>
            <p>{{ movie.vote_average }}</p>
            <img :src="getBackdropUrl(BackdropSize.W300, movie.backdrop_path)" :alt="movie.title" />
        </div>
    </section>
</template>

<style>
.movie-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
