<script setup lang="ts">
import { ref } from "vue";
import type { Movie } from "~/types/Movie";
import { fetchPopularMovies } from "~/services/movies";

const movies = ref<Movie[]>([]);
const isPending = ref<boolean>(true);

async function getPopularMovies() {
    try {
        const data = await fetchPopularMovies();
        movies.value = data.results;
    } catch (error) {
        console.error("Failed to fetch popular movies: ", error);
    } finally {
        isPending.value = false;
    }
}

getPopularMovies();
</script>

<template>
    <section>
        <div>
            <div v-for="movie in movies" :key="movie.id">
                <p>{{ movie.id }}</p>
                <p>{{ movie.title }}</p>
                <p>{{ movie.overview }}</p>
                <p>{{ movie.release_date }}</p>
                <p>{{ movie.vote_average }}</p>
                <NuxtLink :to="`/movies/${movie.id}`">Details</NuxtLink>
                <p>--------------------</p>
            </div>
        </div>
    </section>
</template>

<style></style>
